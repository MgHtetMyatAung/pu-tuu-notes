import './style.scss';
import * as bootstrap from 'bootstrap';
import './public/js/addnew';
import { upDate } from './public/js/addnew';
import { dataRow, todos, toShowData } from './public/js/showdata';
import './public/js/del-updat';
import { statusUpdate } from './public/js/del-updat';

let toTop=document.querySelector('.to-top');
export const title=document.getElementById('title');
export const textMessage=document.getElementById('message-text');

// for screen to top 
toTop.addEventListener('click',_=>{
  window.scrollTo(0,0);
})

window.addEventListener('scroll',_=>{
  scrollY >= 200 ? toTop.classList.add('show'): toTop.classList.remove('show');
})

if(todos){
  toShowData();
}else{
  dataRow.innerHTML=`
      <p class="mt-5 text-center text-white-50">No haven't your notes in here</p>
  `
}

if(todos){
  toShowData("all");
}

dataRow.addEventListener('click',(e)=>{
  if(e.target.classList.contains('update')){
    upDate(e.target.value,e.target.getAttribute('status'));
  }else if(e.target.classList.contains('star')){
    statusUpdate(e.target);
  }
})





