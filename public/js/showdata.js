import { category, links } from "./del-updat";
import Swal from 'sweetalert2';

export const dataRow=document.getElementById('data-row');
export let todos= JSON.parse(localStorage.getItem('Datas')) || [];
export let form=document.getElementById('form');

// for show data item 
export function toShowData(filterStatus){
    if(todos[0]){
        dataRow.innerHTML='';
        todos.forEach((data,id)=>{
            let regular=data.status=="pending" ? "fa-regular":"fa-solid";
            if(filterStatus==data.status || filterStatus=="all" || String(filterStatus).charAt(0)==data.title.toLowerCase().charAt(0)){
                dataRow.innerHTML+=`
                <div class="col-md-6 col-lg-4">
                    <div class="bg-dark p-4 rounded d-flex flex-column" style="height: 100%;">
                    <div class="d-flex align-items-center justify-content-between">
                        <h5 class="note-title text-warning m-0">${data.title}</h5>
                        <span class="note-date text-success m-0">${data.date}</span>
                    </div>
                    <div class="">
                        <p class="my-3 text-white-50">
                            ${data.message}
                        </p>
                    </div>
                    <div class="mt-auto">
                        <hr class="border">
                        <div class="d-flex justify-content-between">
                            <button class="btn p-0 star" value="${id}">
                            <i class="${regular} fa-star text-warning fs-5 pe-none"></i>
                            </button>
                            <div class="">
                            <button class="btn p-0 update" value="${id}" status="${data.status}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <i class="fa-solid fa-pen-to-square text-success pe-none fs-5"></i>
                            </button>
                            <button class="btn p-0 ms-3 del" value="${id}" onclick="del(event,'${data.status}')">
                                <i class="fa-solid fa-trash text-danger pe-none fs-5"></i>
                            </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                `
            }
        })
    }else{
        dataRow.innerHTML=`
            <p class="mt-5 text-center text-white-50">No haven't your notes in here</p>
        `
    }
}

toShowData();


// item delete 
window.del=function(event,mm){
    Swal.fire({
        title: 'Are you sure?',
        text: "Will delete this note !",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes !'
      }).then((result) => {
        if (result.isConfirmed) {
            todos.splice(Number(event.target.value),1);

            localStorage.setItem('Datas',JSON.stringify(todos));
        
            toShowData(mm);

            if(category.innerText=='All'){
                toShowData('all');
            }
        }
      })

}


// for search 
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    toShowData(e.target.children[0].value.toLowerCase());

    e.target.children[0].value='';

    document.querySelector('.nav-link.active').classList.remove('active');
    links[0].classList.add('active');
    category.innerText='All';
})




