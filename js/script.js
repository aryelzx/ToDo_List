// Seleção de elementos // DOM / Variáveis
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue; // variavel do antigo titulo 
// Funções
const saveTodo = (text) =>{ //funcao p criar uma tarefa e salvar o valor
    const todo = document.createElement("div") //cria a div
    todo.classList.add("todo") //adiciona a class
    const todoTitle = document.createElement("h3") // add o h3
    todoTitle.innerText = text; //adiciona a tarefa como texto, text da funcao. oq vem do valor do input
    todo.appendChild(todoTitle) // adiciona  como primeiro
    //Botões
    const doneBtn = document.createElement("button") //cria o botao
    doneBtn.classList.add("finish-todo") //add a classe
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //add o icone
    todo.appendChild(doneBtn)//adiciona o botao ao todo

    const editBtn = document.createElement("button") //cria o botao
    editBtn.classList.add("edit-todo") //add a classe
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>' //add o icone
    todo.appendChild(editBtn)//adiciona como primeiro

    const deleteBtn = document.createElement("button") //cria o botao
    deleteBtn.classList.add("remove-todo") //add a classe
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>' //add o icone
    todo.appendChild(deleteBtn)//adiciona como primeiro
    //todo
    todoList.appendChild(todo); //adiciona como o ultimo
    todoInput.value = ""; //valor vazio quando termina
    todoInput.focus(); //foca no input depois que termina
};
    const toggleForms = () =>{
        editForm.classList.toggle("hide");// se tiver hide, tira, se nao, adiciona
        todoForm.classList.toggle("hide");//esconde ou mostra o todo
        todoList.classList.toggle("hide");//esconde ou mostra a lista
    
    }
    //edição do todo
    const updateTodo = (text) =>{ //funcao de adiciona o novo valor

        const todos = document.querySelectorAll(".todo") //seleciona todos os todo's
        todos.forEach((todo) =>{ //vai chamar cada todo de todo
            let todoTitle = todo.querySelector("h3") //pegando o titulo do todo atual e mapeando para fazer o foreach
       
        if(todoTitle.innerText === oldInputValue){ //comparando se o titulo é igual ao valor salvo na memoria
            todoTitle.innerText = text //todotitle vai ser = ao texto enviado pelo parametro updateTodo
        }
       
        })

    }
// Eventos  
    todoForm.addEventListener("submit", (e)=>{  //enviar form sem recarregar a pag
        e.preventDefault(); //envia pro localhost

        const inputValue = todoInput.value  //valor da tarefa nova.

        if(inputValue){ //validar que o usuario nao crie tarefa sem valor
        
        //salvar o valor do todo
        saveTodo(inputValue)//salva o valor na funcao
         }
    });
//Ações dos botões
    document.addEventListener("click", (e) => { //evento para o documento todo
       const targetEl = e.target   //especifica o elemento
       const parentEl = targetEl.closest("div"); //seleciona a div pai mais proxima (todo)
       let todoTitle;   //variavel titulo
       
       if(parentEl && parentEl.querySelector("h3")){    //verificação de titulo, verifica se há os 2 valores do if
            todoTitle = parentEl.querySelector("h3").innerText; //especifica que o title é o h3
       }
       
       if(targetEl.classList.contains("finish-todo")){ //checagem de classe
            parentEl.classList.toggle("done") // adiciona a classe done
            }
        if(targetEl.classList.contains("remove-todo")){ //checagem da classe
            parentEl.remove(); //remove 
            } 
        if(targetEl.classList.contains("edit-todo")){ //checagem da classe
            toggleForms() // esconde um formulario e mostra outro
            
            editInput.value = todoTitle // muda o valor do input
            oldInputValue = todoTitle // mapeia o valor, salva na memoria
        }     

    })
    //botao de cancelar
    cancelEditBtn.addEventListener("click", (e) => {    //funcao que cancela o form
        e.preventDefault(); //nao envia o formulario

        toggleForms(); //esconde o formulario
    })

    //botao de enviar novo formulario
    editForm.addEventListener("submit", (e) => {  //disparo do botao
      e.preventDefault()//nao envia o formulario
      const editInputValue = editInput.value //troca o valor do input, adicionando a nova tarefa  
       
      if(editInputValue){ //caso vazio = cancela
        updateTodo(editInputValue)  //funcao que adiciona o valor novo
      }
      toggleForms();
    
    
    });
        