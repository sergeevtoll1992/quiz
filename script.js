const DATA =[
    {
        question: 'Какая по счёту планета от Солнца Земля?',
        answers:[
            {
                id:'0',
                value: '3',
                correct: true
            },
            {
                id:'1',
                value: '4',
                correct: false
            },
            {
                id:'2',
                value: '5',
                correct: false
            }
        ]
    },
    {
        question: 'Кто написал произведение "Война и мир?"',
        answers:[
            {
                id:'3',
                value: 'Лермонтов',
                correct: false
            },
            {
                id:'4',
                value: 'Толстой',
                correct: true
            },
            {
                id:'5',
                value: 'Пушкин',
                correct: false
            }
        ]
    },
    {
        question: 'В каком году началась Вторая мировая война?',
        answers:[
            {
                id:'6',
                value: '1945',
                correct: false
            },
            {
                id:'7',
                value: '1939',
                correct: true
            },
            {
                id:'8',
                value: '1941',
                correct: false
            }
        ]
    }
]

let resultsStore ={}



const quiz = document.getElementById('quiz')  
const questions = document.getElementById('questions')
const indicator = document.getElementById('indicator')
const results = document.getElementById('results')
const btnNext = document.getElementById('btn-next')
const btnRestart = document.getElementById('btn-restart')

const renderQuestion = function(index){
    renderIndicator(index+1)

    questions.dataset.currenrt = index
    console.log(questions.dataset.currenrt)

    const renderAnswers = () =>  DATA[index].answers.map((answer)=>

            `
                <li>
                    <label>
                        <input class='answer-input' type="radio" name='${index}' value='${answer.id}'>
                        ${answer.value}
                    </label> 
                </li>
            `
        ).join('')
        console.log(DATA[index].question)

    questions.innerHTML = `
            <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">${DATA[index].question}</div>
            <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
        </div>
    `
}


const renderResults = function(){
    let content = ''

    getClassName =(answer, questionsIndex)=>{
        let className =''

        if(!answer.correct && answer.id === resultsStore[questionsIndex]){
            className = 'answer-invalid'
        }else if(answer.correct){
            className = 'answer-valid'
        }

        return className
    }

    const getAnswers = (questionsIndex  )=>{
        return DATA[questionsIndex].answers.map(answer=>{
            return ` <li class='${getClassName(answer, questionsIndex)}'>${answer.value}</li>`
        })
        .join('')
    }

    DATA.forEach((question, index)=>{
        content += `
        <div class="quiz-result-item" id="results">
            <div class="quiz-resuls-item__question">${question.question}</div>
            <ul class="quiz-result-item__answers">${getAnswers(index)}</ul>
        </div>
        `
    })

    results.innerHTML = content
}

const renderIndicator = function(currenrt){
    indicator.innerHTML = `${currenrt}/${DATA.length}`
}

quiz.addEventListener('change',(event)=>{

})

quiz.addEventListener('click',(event)=>{
    if(event.target.classList.contains('answer-input')){
        resultsStore[event.target.name] = event.target.value
        btnNext.disabled = false
    }
})

quiz.addEventListener('click',(event)=>{
    if(event.target.classList.contains('btn-next')){
        let nextQuestionIndex =+(questions.dataset.currenrt)+1

        if(DATA.length === nextQuestionIndex){
            //переход к результатам
            questions.classList.add('questins--hidden')
            indicator.classList.add('indicator--hidden')
            results.classList.add('results--visible')
            btnNext.classList.add('btn-next--hidden')
            btnRestart.classList.add('btn-restart--visible')
            renderResults()
            
        }else{
            //переход к следующему вопросу
            renderQuestion(nextQuestionIndex)
        }

        btnNext.disabled = true
    }

    if(event.target.classList.contains('btn-restart')){
        resultsStore ={}
        results.innerHTML = ''


        console.log('Сначала')
        questions.classList.remove('questins--hidden')
        indicator.classList.remove('indicator--hidden')
        results.classList.remove('results--visible')
        btnNext.classList.remove('btn-next--hidden')
        btnRestart.classList.remove('btn-restart--visible')

        renderQuestion(0)
    }
})

renderQuestion(0)
