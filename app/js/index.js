
let pushBtn = document.getElementById('pushBtn');
let dashboard = document.getElementById('sidebarLeft');
let tasks = document.getElementsByClassName('card-tasks__item');

pushBtn.addEventListener('click', function(e){
  dashboard.classList.toggle("open");
});

[].forEach.call(tasks, function(el){
  el.addEventListener('click', function(e){
    e.stopPropagation();
    el.classList.toggle('checked');
  });
});
