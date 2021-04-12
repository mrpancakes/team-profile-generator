function createManager(input){
    `<div class="card" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
        <h5 class="card-title">Name</h5>
        <h6 class="card-text">Sample Title</h6>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${input}</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
    </ul>
</div>`
}


function renderPage(team){
// const input = JSON.stringify(team);
// return input[1];
let input = JSON.stringify(team);
return createManager(input)

};

module.exports = renderPage;