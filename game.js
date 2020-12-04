let canvas = document.querySelector("#aCanvas");
let context = canvas.getContext("2d");

const model = {
    dodger: {xCoor: 180, yCoor: 180},
    dodger2: {xCoor: 300, yCoor: 300}, 
    item: {xCoor: 100, yCoor: 100},
    horizontalAttackers: [],
    verticalAttackers: [],
    squareAttacker: {xCoor: 40, yCoor: 40},
    squareAttacker2: {xCoor: 380, yCoor: 360}
}

const state = {
    newGame: true,
    collision: false,
    horizontalAttackersDirection: "right",
    verticalAttackersDirection: "down",
    framesCounter: 0,
    framesForMovement: 20,
    points: 0,
    dimension: 20,
}

function drawDodger() 
{
    context.fillStyle = "DodgerBlue"
    context.fillRect(model.dodger.xCoor, model.dodger.yCoor, state.dimension, state.dimension)
    context.fillStyle = "red"
    context.fillRect(model.dodger2.xCoor, model.dodger2.yCoor, state.dimension, state.dimension)
}

function drawAttackers() 
{
    if(state.newGame)
    {
        for(let i = 0; i <= 10; i++)
        {
            model.horizontalAttackers.push({xCoor: 0, yCoor: (i * 40)})
            model.verticalAttackers.push({xCoor: (i * 40), yCoor: 0})
        }
        
        state.newGame = false;
    }
    context.fillStyle = "black"
    model.horizontalAttackers.map((a) => context.fillRect(a.xCoor, a.yCoor, state.dimension, state.dimension))
    model.verticalAttackers.map((a) => context.fillRect(a.xCoor, a.yCoor, state.dimension, state.dimension))

    if(state.points >= 6)//change to 6 when done with square movement
    {
        context.fillRect(model.squareAttacker.xCoor, model.squareAttacker.yCoor, state.dimension, state.dimension)
        context.fillRect(model.squareAttacker2.xCoor, model.squareAttacker2.yCoor, state.dimension, state.dimension)
    }
}

function drawItem()
{
    context.fillStyle = "white"
    context.fillRect(model.item.xCoor, model.item.yCoor, state.dimension, state.dimension)
}

function dodgerMovement(keydown)
{
    switch (keydown) {
        case "ArrowRight": if(model.dodger.xCoor + 20 < canvas.width) model.dodger.xCoor+=20
            break;
        case "ArrowLeft": if(model.dodger.xCoor > 0) model.dodger.xCoor-=20
            break;
        case "ArrowUp": if(model.dodger.yCoor > 0) model.dodger.yCoor-=20 
            break;
        case "ArrowDown": if(model.dodger.yCoor + 20 < canvas.height) model.dodger.yCoor+=20
            break;
        default:
            break;
    }

    switch (keydown) {
        case "d": if(model.dodger2.xCoor + 20 < canvas.width) model.dodger2.xCoor+=20
            break;
        case "a": if(model.dodger2.xCoor > 0) model.dodger2.xCoor-=20
            break;
        case "w": if(model.dodger2.yCoor > 0) model.dodger2.yCoor-=20 
            break;
        case "s": if(model.dodger2.yCoor + 20 < canvas.height) model.dodger2.yCoor+=20
            break;
        default:
            break;
    }
}

function attackersMovement()
{
    if(++state.framesCounter % state.framesForMovement == 0)// 20 to 8 for now
    {
        
        if(model.horizontalAttackers[0].xCoor == canvas.width - 20)
        {
            state.horizontalAttackersDirection = "left"
        }
        else if(model.horizontalAttackers[0].xCoor == 0)
        {
            state.horizontalAttackersDirection = "right"
        }
    
        if(state.horizontalAttackersDirection == "right")
        {
            model.horizontalAttackers.map((a)=>a.xCoor +=20)
        }
        else if(state.horizontalAttackersDirection == "left")
        {
            model.horizontalAttackers.map((a)=>a.xCoor -=20)
        }

        if(model.verticalAttackers[0].yCoor == canvas.height - 20)
        {
            state.verticalAttackersDirection = "up"
        }
        else if(model.verticalAttackers[0].yCoor == 0)
        {
            state.verticalAttackersDirection = "down"
        }
    
        if(state.verticalAttackersDirection == "up")
        {
            model.verticalAttackers.map((a)=>a.yCoor -=20)
        }
        else if(state.verticalAttackersDirection == "down")
        {
            model.verticalAttackers.map((a)=>a.yCoor +=20)
        }

        if(state.points >= 6)//change 0 to 6
        {   
            if(model.squareAttacker.yCoor == 40)
            {
                model.squareAttacker.xCoor += 20
                model.squareAttacker2.xCoor -= 20
            }

            if(model.squareAttacker.xCoor == 360)
            {   
                model.squareAttacker.yCoor += 20
                model.squareAttacker2.yCoor -= 20
            }

            if(model.squareAttacker.yCoor == 360)
            {
                model.squareAttacker.xCoor -= 20
                model.squareAttacker2.xCoor += 20
            }

            if(model.squareAttacker.xCoor == 40)
            {
                model.squareAttacker.yCoor -= 20
                model.squareAttacker2.yCoor += 20
            }


           // model.squareAttacker.xCoor += 20
        }
    }
}

function detectCollision()
{
    model.horizontalAttackers.map((a) =>
    {
        if(a.xCoor == model.dodger.xCoor && a.yCoor == model.dodger.yCoor || a.xCoor == model.dodger2.xCoor && a.yCoor == model.dodger2.yCoor)
            state.collision = true
    })

    model.verticalAttackers.map((a) =>
    {
        if(a.xCoor == model.dodger.xCoor && a.yCoor == model.dodger.yCoor || a.xCoor == model.dodger2.xCoor && a.yCoor == model.dodger2.yCoor)
            state.collision = true
    })

    if(model.squareAttacker.xCoor == model.dodger.xCoor && model.squareAttacker.yCoor == model.dodger.yCoor 
        || model.squareAttacker2.xCoor == model.dodger.xCoor && model.squareAttacker2.yCoor == model.dodger.yCoor)
    {
        state.collision = true
    }

    if(model.squareAttacker.xCoor == model.dodger2.xCoor && model.squareAttacker.yCoor == model.dodger2.yCoor 
        || model.squareAttacker2.xCoor == model.dodger2.xCoor && model.squareAttacker2.yCoor == model.dodger2.yCoor)
    {
        state.collision = true
    }


    //return state.collision
}

function detectItemCollision()
{
    if(model.dodger.xCoor == model.item.xCoor && model.dodger.yCoor == model.item.yCoor || model.dodger2.xCoor == model.item.xCoor && model.dodger2.yCoor == model.item.yCoor)
    {
        model.item.xCoor = Math.floor(Math.random() * 21) * 20
        model.item.yCoor = Math.floor(Math.random() * 21) * 20
        state.points++

        if(state.points % 2 == 0)
        {   
            if(state.framesForMovement > 8)
                state.framesForMovement -= 2;

        }
    }
}

function detectDodger1And2Collision() 
{
    if(model.dodger.xCoor == model.dodger2.xCoor && model.dodger.yCoor == model.dodger2.yCoor)
    {
        state.collision = true
    }
}

function drawGameOverScreen()
{
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = "20px Arial"
    context.fillText("GAME OVER", 140, 180)
    context.fillText("SCORE: " + state.points, 140, 240)
    context.fillText("Click Anywhere to Restart Game", 80, 300)
}

function render()
{
    if(!state.collision)
    {   
        drawDodger()
        drawAttackers()
        drawItem()
        detectItemCollision()
        attackersMovement()
        detectDodger1And2Collision()
        detectCollision()
    }
    else
    {
        drawGameOverScreen()
    }
}

function newGame()
{  
    if(state.collision)
    {
        state.newGame = true
        state.collision = false
        state.framesCounter = 0
        state.framesForMovement = 20
        state.points = 0
        model.horizontalAttackers = []
        model.verticalAttackers = []
        model.dodger.xCoor = 180
        model.dodger.yCoor = 180
        model.dodger2.xCoor = 300
        model.dodger2.yCoor = 300 
        model.squareAttacker.xCoor = 40
        model.squareAttacker.yCoor = 40
        model.squareAttacker2.xCoor = 380
        model.squareAttacker2.yCoor = 360        
    }   
}

function animation()
{   
    window.requestAnimationFrame(animation)         
    context.clearRect(0, 0, canvas.width, canvas.height)
    render()
}

window.requestAnimationFrame(animation)
document.querySelector("body").addEventListener("keydown", (event) => (dodgerMovement(event.key)))
document.querySelector("body").addEventListener("mousedown", () => (newGame()))