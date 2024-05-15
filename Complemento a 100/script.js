document.addEventListener('DOMContentLoaded', function() {
    var countdownDisplay = document.getElementById('countdown');
    var progressBar = document.getElementById('progressBar');
    var answerInput = document.getElementById('answer');
    var resultDisplay = document.getElementById('result');
    var startButton = document.getElementById('startButton');
    var resetButton = document.getElementById('resetButton');
    var leaderboardBody = document.getElementById('leaderboardBody');
    var userNameInput = document.getElementById('userName');
    var submitNameButton = document.getElementById('submitNameButton');
    var userGreeting = document.getElementById('userGreeting');
    var leaderboardCaption = document.querySelector('.leaderboard-caption');
    var correctAnswer;
    var timer;
    var correctCount = 0;
    var wrongCount = 0;
    var totalAttempts = 0;
    var practiceStarted = false;
    var countdownTimer;
    var userName = '';

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showMultiplication() {
        var num1 = getRandomNumber(0, 12);
        var num2 = getRandomNumber(0, 12);
        correctAnswer = num1 * num2;
        document.getElementById('multiplication').innerText = num1 + ' x ' + num2 + ' = ';
    }

    function updateProgressBar(progress) {
        progressBar.style.width = progress + '%';
        if (progress <= 1) {
            progressBar.classList.remove('progress-bar-red', 'progress-bar-orange');
        } else if (progress <= 10) {
            progressBar.classList.remove('progress-bar-green', 'progress-bar-orange');
            progressBar.classList.add('progress-bar-red');
        } else if (progress <= 50) {
            progressBar.classList.remove('progress-bar-green');
            progressBar.classList.add('progress-bar-orange');
        } else {
            progressBar.classList.add('progress-bar-green');
        }
    }

    function startCountdownTimer() {
        var countdownTime = 5;
        countdownDisplay.textContent = countdownTime;
        startButton.disabled = true;
        countdownTimer = setInterval(function() {
            countdownTime--;
            countdownDisplay.textContent = countdownTime;
            if (countdownTime <= 0) {
                clearInterval(countdownTimer);
                countdownDisplay.textContent = '';
                startPractice();
            }
        }, 1000);
    }

    function startPractice() {
        if (!practiceStarted) {
            practiceStarted = true;
            showMultiplication();
            countdown();
            answerInput.disabled = false;
            answerInput.focus();
            resetButton.style.display = 'none';
        }
    }

    function resetPractice() {
        clearInterval(timer);
        clearInterval(countdownTimer);
        countdownDisplay.textContent = '';
        resultDisplay.textContent = '';
        correctCount = 0;
        wrongCount = 0;
        totalAttempts = 0;
        practiceStarted = false;
        startButton.disabled = false;
        resetButton.style.display = 'none';
        progressBar.style.width = '100%';
        answerInput.disabled = false;
        answerInput.value = '';
        answerInput.style.backgroundColor = '';
    }

    function showResults() {
        var currentDate = new Date().toLocaleString();
        var newRow = document.createElement('tr');
        newRow.innerHTML = '<td>' + currentDate + '</td>' +
                           '<td>' + correctCount + '</td>' +
                           '<td>' + wrongCount + '</td>' +
                           '<td>' + totalAttempts + '</td>' +
                           '<td>' + (correctCount - wrongCount) + '</td>';
        leaderboardBody.appendChild(newRow);
    }

    function checkAnswer() {
        var userAnswer = parseInt(answerInput.value);
        if (!isNaN(userAnswer)) {
            totalAttempts++;
            if (userAnswer === correctAnswer) {
                correctCount++;
            } else {
                wrongCount++;
            }
            answerInput.value = '';
            showMultiplication();
        }
    }

    function countdown() {
        var totalTime = 60;
        var intervalDuration = 1000;
        var timeLeft = totalTime;
        var progressBarIncrement = 100 / totalTime;

        timer = setInterval(function() {
            timeLeft--;
            countdownDisplay.textContent = timeLeft;
            updateProgressBar(progressBarIncrement * timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                countdownDisplay.textContent = '¡Tiempo!';
                document.getElementById('multiplication').textContent = '';
                answerInput.disabled = true;
                showResults();
                resetButton.style.display = 'block';
            }
        }, intervalDuration);
    }

    submitNameButton.addEventListener('click', function() {
        userName = userNameInput.value.trim();
        if (userName) {
            userGreeting.textContent = 'Usuario: ' + userName;
            userNameInput.classList.add('hidden');
            submitNameButton.classList.add('hidden');
            startButton.disabled = false;
            leaderboardCaption.textContent = 'Resultados para: ' + userName;
        }
    });

    startButton.addEventListener('click', startCountdownTimer);
    resetButton.addEventListener('click', resetPractice);
    resetButton.style.display = 'none';

    answerInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Solo permite números
    });

    answerInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkAnswer();
        }
    });
});
