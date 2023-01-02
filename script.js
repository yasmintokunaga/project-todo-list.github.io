// INDICAÇÃO DE TAREFA FEITA DUPLO CLIQUE

const completTask = (event) => {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
  return console.log('ok');
};

// FORMAÇÃO BACKGROUND GREY PARA ITEM SELECIONADO

const desSelectTask = () => {
  const selectedTask = document.querySelector('#selected');
  if (selectedTask) {
    selectedTask.removeAttribute('id');
  }
  return console.log('ok');
};

const selectTask = (event) => {
  const itemTarget = event.target;
  if (itemTarget.id === 'selected') {
    desSelectTask();
  } else {
    desSelectTask();
    itemTarget.id = 'selected';
  }
  return console.log('ok');
};

// INCLUSÃO DE NOVA TAREFA

const inputTarefa = document.querySelector('#texto-tarefa');
const btnCriarTarefa = document.querySelector('#criar-tarefa');
const listTasks = document.getElementById('lista-tarefas');

const createNewTask = (textTask, className) => {
  const newTask = document.createElement('li');
  newTask.innerText = textTask;
  newTask.addEventListener('dblclick', completTask);
  newTask.addEventListener('click', selectTask);
  listTasks.appendChild(newTask);
  document.querySelector('#texto-tarefa').value = '';
  if (className) {
    newTask.classList = className;
  }
};

btnCriarTarefa.addEventListener('click', () => {
  const inputTask = inputTarefa.value;
  if (inputTask.length > 0) {
    createNewTask(inputTask);
  }
});

// CONFIGURANDO BOTÃO APAGA TUDO

const btnApagaTudo = document.getElementById('apaga-tudo');
btnApagaTudo.addEventListener('click', () => {
  const taskItem = document.getElementsByTagName('li');
  while (taskItem.length > 0) {
    listTasks.removeChild(taskItem[0]);
  }
});

// CONFIGURAÇÃO BOTÃO REMOVER FINALIZADOS
const btnRemoverFinalizados = document.getElementById('remover-finalizados');
btnRemoverFinalizados.addEventListener('click', () => {
  const completedTasks = document.getElementsByClassName('completed');
  while (completedTasks.length > 0) {
    listTasks.removeChild(completedTasks[0]);
  }
});

// CONFIGURAÇÃO BOTÃO SALVAR TAREFAS

const storage = localStorage;
const btnSalvarTarefas = document.querySelector('#salvar-tarefas');

const salvarTarefas = () => {
  const taskItem = document.getElementsByTagName('li');
  const arrayTasks = [];
  const arrayClassTasks = [];
  for (let index = 0; index < taskItem.length; index += 1) {
    arrayTasks.push(taskItem[index].innerText);
    arrayClassTasks.push(taskItem[index].classList);
  }
  const objTasks = {
    objLiteral: 'resolvendo-projeto',
    tasks: arrayTasks,
    classTasks: arrayClassTasks,
  };
  storage.setItem('tasks', JSON.stringify(objTasks));
};
btnSalvarTarefas.addEventListener('click', salvarTarefas);

const repairList = () => {
  if (storage.getItem('tasks')) {
    const objTasks = JSON.parse(storage.getItem('tasks'));
    const arrayTasks = objTasks.tasks;
    const arrayClassTasks = objTasks.classTasks;
    for (let index = 0; index < arrayTasks.length; index += 1) {
      createNewTask(arrayTasks[index], arrayClassTasks[index][0]);
    }
  }
};
repairList();

// CONFIGURANDO BOTÃO MOVER PARA CIMA/BAIXO

const identifyPositionSelected = () => {
  const taskItem = document.getElementsByTagName('li');
  for (let index = 0; index < taskItem.length; index += 1) {
    if (taskItem[index].id === 'selected') {
      return index;
    }
  }
};

const changePositionTask = (index, numero) => {
  const taskItem = document.getElementsByTagName('li');
  const itemSelected = taskItem[index];
  const otherItem = taskItem[index + numero];
  const textItemSelected = itemSelected.innerText;
  const textOtherItem = otherItem.innerText;
  const classSelected = itemSelected.className;
  const classOtherItem = otherItem.className;
  taskItem[index].innerText = textOtherItem;
  taskItem[index].removeAttribute('id');
  taskItem[index].className = classOtherItem;
  taskItem[index + numero].innerText = textItemSelected;
  taskItem[index + numero].id = 'selected';
  taskItem[index + numero].className = classSelected;
};

const btnMoverParaCima = document.getElementById('mover-cima');
btnMoverParaCima.addEventListener('click', () => {
  const position = identifyPositionSelected();
  if (position > 0) {
    changePositionTask(position, -1);
    desSelectTask();
  }
});

const btnMoverParaBaixo = document.getElementById('mover-baixo');
btnMoverParaBaixo.addEventListener('click', () => {
  const taskItem = document.getElementsByTagName('li');
  const position = identifyPositionSelected();
  if (position < taskItem.length - 1) {
    changePositionTask(position, 1);
  }
});

// CONFIGURADO BOTÃO REMOVER SELECIONADO

const btnRemoverSelecionado = document.querySelector('#remover-selecionado');
btnRemoverSelecionado.addEventListener('click', () => {
  const selectedTask = document.querySelector('#selected');
  listTasks.removeChild(selectedTask);
});
