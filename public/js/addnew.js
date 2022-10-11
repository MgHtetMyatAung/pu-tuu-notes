import { textMessage, title } from "../../main";
import * as bootstrap from 'bootstrap';
import { category } from "./del-updat";
import { todos, toShowData } from "./showdata";
import Swal from 'sweetalert2';

export const addNew=document.getElementById('added-new');
export let clearAll=document.getElementById('clear-all');
let forTitle=document.querySelector('.for-title');
let forNote=document.querySelector('.for-note');
let titleShow=document.querySelector('.title-show');
let crtBtn=document.querySelector('.crt-btn');

export let isEditId;
export let isEditText=false;
export let upStatus;

let dates=new Date();
let day=dates.getDate();
let month=dates.getMonth()+1;
let year=dates.getFullYear();
let date=`${day}/${month}/${year}`;

const modal = new bootstrap.Modal('#staticBackdrop');


// added new items 
addNew.addEventListener('click',_=>{
    if(title.value.trim() && textMessage.value.trim()){

        if(isEditText){
            todos[isEditId].title= title.value;
            todos[isEditId].message= textMessage.value;

            isEditText=false;
            isEditId;

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Update successfully'
              })

              toShowData(upStatus);
        }else{
        
            let inputDatas={
                title : title.value,
                message: textMessage.value,
                status: 'pending',
                date,
            };
        
            todos.push(inputDatas);

            toShowData("all");
        }

        titleShow.innerText="Added New";
    
        localStorage.setItem('Datas',JSON.stringify(todos));
    
        title.value='';
        textMessage.value='';
    
        forTitle.classList.add('d-none');
        forNote.classList.add('d-none');

        modal.hide();


    }else if(title.value.trim() && !textMessage.value.trim()){
        forTitle.classList.add('d-none');
        forNote.classList.remove('d-none');
    }else if(!title.value.trim() && textMessage.value.trim()){
        forNote.classList.add('d-none');
        forTitle.classList.remove('d-none');
    }else{
        forTitle.classList.remove('d-none');
        forNote.classList.remove('d-none');
    }
})


// clear all datas 
clearAll.addEventListener('click',_=>{

    Swal.fire({
        title: 'Are you sure?',
        text: "Will delete all notes !",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3FA796',
        cancelButtonColor: '#d53232',
        confirmButtonText: 'Yes !'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your all notes has been deleted.',
            'success'
          )
          if(localStorage.getItem('Datas')){
            todos.splice(0,todos.length);
            localStorage.setItem('Datas',JSON.stringify(todos));
          }
          toShowData('all');
        }
    })
})

// update existing items 
export function upDate(e,status){
    titleShow.innerText="Update Note"
    isEditText= true;
    isEditId=Number(e);
    upStatus= category.innerText.toLowerCase();
    title.value=todos[isEditId].title;
    textMessage.value=todos[isEditId].message;

    if(category.innerText.toLowerCase()==status){
        toShowData(status);
    }else{
        toShowData('all');
    }
}

crtBtn.addEventListener('click',()=>{
    titleShow.innerText="Added New";
    title.value='';
    textMessage.value='';
})