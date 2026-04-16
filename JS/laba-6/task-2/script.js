let state = {
    tasks: [],
    currentSort: 'createdAt' // 'createdAt', 'updatedAt', 'status'
};

const addTask = (tasks, text) => {
    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    return [...tasks, newTask];
};

const removeTask = (tasks, id) => {
    return tasks.filter(task => task.id !== id);
};

const toggleTask = (tasks, id) => {
    return tasks.map(task => 
        task.id === id 
            ? { ...task, completed: !task.completed, updatedAt: Date.now() } 
            : task
    );
};

const updateTaskText = (tasks, id, newText) => {
    return tasks.map(task => 
        task.id === id 
            ? { ...task, text: newText, updatedAt: Date.now() } 
            : task
    );
};

const sortTasks = (tasks, sortType) => {
    const tasksCopy = [...tasks];
    
    switch (sortType) {
        case 'status':
            return tasksCopy.sort((a, b) => Number(a.completed) - Number(b.completed));
        case 'updatedAt':
            return tasksCopy.sort((a, b) => b.updatedAt - a.updatedAt);
        case 'createdAt':
        default:
            return tasksCopy.sort((a, b) => b.createdAt - a.createdAt);
    }
};

const taskListElement = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');

function render() {
    const sortedTasks = sortTasks(state.tasks, state.currentSort);

    taskListElement.innerHTML = '';

    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.id = task.id;

        li.innerHTML = `
            <div class="task-content" onclick="handleToggle('${task.id}')">
                <div class="checkbox"></div>
                <span class="task-text" id="text-${task.id}">${task.text}</span>
            </div>
            <div class="task-actions">
                <button class="btn-edit" onclick="handleEdit(event, '${task.id}')">Редагувати</button>
                <button class="btn-delete" onclick="handleDelete(event, '${task.id}')">Видалити</button>
            </div>
        `;
        taskListElement.appendChild(li);
    });
}


addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = newTaskInput.value.trim();
    
    if (text.length >= 3) {
        state.tasks = addTask(state.tasks, text);
        newTaskInput.value = '';
        render();
    }
});

window.handleDelete = (event, id) => {
    event.stopPropagation();
    
    const taskItem = document.getElementById(id);
    taskItem.classList.add('removing');
    
    setTimeout(() => {
        state.tasks = removeTask(state.tasks, id);
        render();
    }, 300);
};

window.handleToggle = (id) => {
    state.tasks = toggleTask(state.tasks, id);
    render();
};

window.handleEdit = (event, id) => {
    event.stopPropagation();
    
    const textSpan = document.getElementById(`text-${id}`);
    const taskItem = document.getElementById(id);
    
    if (taskItem.classList.contains('completed')) return;

    textSpan.contentEditable = "true";
    textSpan.focus();
    
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(textSpan);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    const saveChanges = () => {
        textSpan.contentEditable = "false";
        const newText = textSpan.textContent.trim();
        
        if (newText.length > 0) {
            state.tasks = updateTaskText(state.tasks, id, newText);
        }
        render();
    };

    textSpan.onblur = saveChanges;
    textSpan.onkeydown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textSpan.blur();
        }
    };
};

document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        state.currentSort = e.target.dataset.sort;
        render();
    });
});