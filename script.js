window.onload = () => {
    const myQuestions = [{
            question: 'Javascript is _________ language',
            answers: {
                a: 'Programming',
                b: 'Application',
                c: 'None of These',
                d: 'Scripting'
            },
            multi: true,
            correctAnswer: 'ad'
        },
        {
            question: 'Which of the following is a valid type of function javascript supports?',
            answers: {
                a: 'named function',
                b: 'anonymous function',
                c: 'both of the above',
                d: 'none of the above'
            },
            multi: false,
            correctAnswer: 'b'
        },
        {
            question: 'Which built-in method returns the index within the calling String object of the first occurrence of the specified value?',
            answers: {
                a: 'getIndex()',
                b: 'location()',
                c: 'indexOf()',
                d: 'getLocation()'
            },
            multi: false,
            correctAnswer: 'c'
        },
        {
            question: 'Which one of the following is valid data type of JavaScript',
            answers: {
                a: 'number',
                b: 'void',
                c: 'boolean',
                d: 'nothing'
            },
            multi: false,
            correctAnswer: 'c'
        }
    ];
    class Question {
        constructor(obj, index) {
            this.question = obj.question;
            this.answers = obj.answers;
            this.multi = obj.multi;
            this.correctAnswer = obj.correctAnswer;
            this.index = index;
            this.currentAnswer = "";
        }
    }
    class App {
        constructor(myQuestions) {
            this.questions = myQuestions.map((item, index) => {
                return new Question(item, index);
            });
            this.currentItem = 0;
            this.nextButton = document.getElementById("nextButton");
            this.nextButton.addEventListener("click", this.next.bind(this));
            this.previousButton = document.getElementById("preButton");
            this.previousButton.addEventListener("click", this.previous.bind(this));
            this.submitButton = document.getElementById("submitButton");
            this.submitButton.addEventListener("click", this.submit.bind(this));
            this.point = 0;
        }
        render(index) {
            let type;
            document.getElementById("quizContainer").innerHTML = ``;
            if (this.questions[index].multi == true) {
                type = "checkbox"
            } else {
                type = "radio";
            }
            let strHTML = `<div><p>Question ${index + 1}: ${this.questions[index].question}</p>`;
            for (let answer in this.questions[index].answers) {
                if (this.questions[index].currentAnswer.indexOf(answer) >= 0) {
                    strHTML += `<div><input value="${answer}" name="${index}" type="${type}" checked><p class="inline"> ${answer}. ${this.questions[index].answers[answer]}</p></div>`
                } else {
                    strHTML += `<div><input value="${answer}" name="${index}" type="${type}"><p class="inline"> ${answer}. ${this.questions[index].answers[answer]}</p></div>`
                }
            }
            strHTML += `</div>`;
            document.getElementById("quizContainer").innerHTML = strHTML;
            if (index == 0) {
                document.getElementById("preButton").setAttribute("class", "hide");
                document.getElementById("submitButton").setAttribute("class", "hide");
                document.getElementById("nextButton").setAttribute("class", "");
            } else if (index == this.questions.length - 1) {
                document.getElementById("preButton").setAttribute("class", "");
                document.getElementById("nextButton").setAttribute("class", "hide");
                document.getElementById("submitButton").setAttribute("class", "");
            } else {
                document.getElementById("nextButton").setAttribute("class", "");
                document.getElementById("preButton").setAttribute("class", "");
                document.getElementById("submitButton").setAttribute("class", "hide");
            }
        }
        next() {
            let inputItems = document.getElementsByTagName("input");
            this.questions[this.currentItem].currentAnswer = ""
            for (let i = 0; i < inputItems.length; i++) {
                if (inputItems[i].checked) {
                    this.questions[this.currentItem].currentAnswer += inputItems[i].value;
                }
            }
            this.currentItem++
            this.render(this.currentItem);
        }
        previous() {
            let inputItems = document.getElementsByTagName("input");
            this.questions[this.currentItem].currentAnswer = ""
            for (let i = 0; i < inputItems.length; i++) {
                if (inputItems[i].checked) {
                    this.questions[this.currentItem].currentAnswer += inputItems[i].value;
                }
            }
            this.currentItem--;
            this.render(this.currentItem);
        }
        submit() {
            let inputItems = document.getElementsByTagName("input");
            this.questions[this.currentItem].currentAnswer = ""
            for (let i = 0; i < inputItems.length; i++) {
                if (inputItems[i].checked) {
                    this.questions[this.currentItem].currentAnswer += inputItems[i].value;
                }
            }
            document.getElementById("nextButton").setAttribute("class", "hide");
            document.getElementById("preButton").setAttribute("class", "hide");
            document.getElementById("submitButton").setAttribute("class", "hide");
            this.questions.forEach((item, index) => {
                if (item.currentAnswer == item.correctAnswer.toString()) {
                    this.point ++;
                }
            });
            let result = document.getElementById("result");
            result.setAttribute("class", "");
            result.innerHTML = this.point + " out of " + this.questions.length;
        }
    }

    let app = new App(myQuestions);
    app.render(0);
}