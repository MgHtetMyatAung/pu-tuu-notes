
import './showdata';
import { todos, toShowData } from './showdata';
import '../../main';

export let links=document.querySelectorAll('ul .nav-link');
export let category=document.getElementById('category');

links.forEach((x)=>{
    x.addEventListener('click',()=>{
        document.querySelector('.nav-link.active').classList.remove('active');
        x.classList.add('active');
        category.innerText=x.id.charAt(0).toUpperCase()+x.id.slice(1);

        toShowData(x.id);
    })

    if(x.classList.contains('active')){
        toShowData(x.id);
    }

});


// for statusUpdate 
export function statusUpdate(e){
    if(e.children[0].classList.contains('fa-regular')){
        e.children[0].classList.remove('fa-regular');
        e.children[0].classList.add('fa-solid');

        todos[Number(e.value)].status="complete";
    }else{
        e.children[0].classList.remove('fa-solid');
        e.children[0].classList.add('fa-regular');

        todos[Number(e.value)].status="pending";
    }

    localStorage.setItem("Datas",JSON.stringify(todos));
}




