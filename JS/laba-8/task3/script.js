const tasks = document.querySelectorAll('.task');
const taskLists = document.querySelectorAll('.task-list');
let draggedTask = null;
const placeholder = document.createElement('div');
placeholder.className = 'task placeholder';

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging):not(.placeholder)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};

tasks.forEach(task => {
    task.addEventListener('dragstart', (e) => {
        draggedTask = task;
        task.classList.add('dragging');
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';

        setTimeout(() => {
            task.style.display = 'none';
        }, 0);
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
        task.style.display = 'flex';
        if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
        draggedTask = null;
    });
});

taskLists.forEach(list => {
    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        list.classList.add('drag-over');

        const afterElement = getDragAfterElement(list, e.clientY);
        if (!afterElement) {
            list.appendChild(placeholder);
        } else {
            list.insertBefore(placeholder, afterElement);
        }
    });

    list.addEventListener('dragleave', (e) => {
        const related = e.relatedTarget;
        if (!related || !list.contains(related)) {
            list.classList.remove('drag-over');
            if (placeholder.parentNode === list) {
                list.removeChild(placeholder);
            }
        }
    });

    list.addEventListener('drop', (e) => {
        e.preventDefault();
        list.classList.remove('drag-over');

        if (draggedTask) {
            list.insertBefore(draggedTask, placeholder);
            draggedTask.style.display = 'flex';
        }

        if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
    });
});