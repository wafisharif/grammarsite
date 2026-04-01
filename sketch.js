// ------------------------------
// SECTION NAVIGATION
// ------------------------------
function showSection(sectionId) {
    const sections = document.querySelectorAll(".page-section");
    sections.forEach(section => section.classList.add("hidden"));
  
    document.getElementById(sectionId).classList.remove("hidden");
  
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => btn.classList.remove("active"));
  
    const activeBtn = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
    if (activeBtn) {
      activeBtn.classList.add("active");
    }
  }
  
  // ------------------------------
  // FLASHCARDS
  // ------------------------------
  const flashcards = [
    {
      prompt: "Because the lights went out",
      answer: "Dependent clause — it starts with 'because' and does not form a complete thought by itself."
    },
    {
      prompt: "The students finished the lab",
      answer: "Independent clause — it has a subject, a verb, and a complete thought."
    },
    {
      prompt: "When the movie ended",
      answer: "Dependent clause — it leaves the reader hanging."
    },
    {
      prompt: "My brother burned the toast again",
      answer: "Independent clause — complete idea, no missing main thought."
    },
    {
      prompt: "Although the dog looked innocent",
      answer: "Dependent clause — it sounds incomplete without another clause."
    },
    {
      prompt: "The engineer fixed the machine",
      answer: "Independent clause — complete sentence."
    }
  ];
  
  let flashcardIndex = 0;
  
  function renderFlashcard() {
    document.getElementById("flashcardPrompt").textContent = flashcards[flashcardIndex].prompt;
    const answerBox = document.getElementById("flashcardAnswer");
    answerBox.classList.add("hidden");
    answerBox.textContent = "";
  }
  
  function revealFlashcard() {
    const answerBox = document.getElementById("flashcardAnswer");
    answerBox.classList.remove("hidden");
    answerBox.textContent = flashcards[flashcardIndex].answer;
  }
  
  function nextFlashcard() {
    flashcardIndex = (flashcardIndex + 1) % flashcards.length;
    renderFlashcard();
  }
  
  function prevFlashcard() {
    flashcardIndex = (flashcardIndex - 1 + flashcards.length) % flashcards.length;
    renderFlashcard();
  }
  
  // ------------------------------
  // PRACTICE QUIZ
  // 12+ questions, explanations included
  // ------------------------------
  const practiceQuestions = [
    {
      text: "Because the storm knocked out the power",
      answer: "dependent",
      explanation: "It starts with 'because' and does not complete the thought."
    },
    {
      text: "The storm knocked out the power",
      answer: "independent",
      explanation: "This is a full thought with subject + verb."
    },
    {
      text: "When the bell rang",
      answer: "dependent",
      explanation: "It tells us when, but does not finish the idea."
    },
    {
      text: "The class ran into the hallway",
      answer: "independent",
      explanation: "It stands alone as a complete sentence."
    },
    {
      text: "Although my cat pretends to be innocent",
      answer: "dependent",
      explanation: "It starts with a subordinating word and leaves you hanging."
    },
    {
      text: "My cat knocked the glass off the table",
      answer: "independent",
      explanation: "Complete thought. Subject, verb, and meaning are all there."
    },
    {
      text: "If the robot wins the contest",
      answer: "dependent",
      explanation: "This sets up a condition but doesn’t complete the thought."
    },
    {
      text: "The robot wins the contest every year",
      answer: "independent",
      explanation: "This clause can stand by itself."
    },
    {
      text: "Since the bus was late",
      answer: "dependent",
      explanation: "This explains why or when, but the main idea is missing."
    },
    {
      text: "We missed the beginning of the movie",
      answer: "independent",
      explanation: "Complete sentence. Nothing is missing."
    },
    {
      text: "While I was doing my homework",
      answer: "dependent",
      explanation: "It starts with 'while' and needs a main clause."
    },
    {
      text: "My friend kept sending me memes",
      answer: "independent",
      explanation: "Complete thought with no dependency."
    }
  ];
  
  let currentPracticeIndex = 0;
  let practiceScore = 0;
  let answeredCurrentQuestion = false;
  
  function renderPracticeQuestion() {
    const q = practiceQuestions[currentPracticeIndex];
    document.getElementById("questionText").textContent = q.text;
    document.getElementById("progressText").textContent =
      `Question ${currentPracticeIndex + 1} of ${practiceQuestions.length}`;
    document.getElementById("scoreText").textContent = `Score: ${practiceScore}`;
    document.getElementById("progressFill").style.width =
      `${(currentPracticeIndex / practiceQuestions.length) * 100}%`;
  
    const feedback = document.getElementById("practiceFeedback");
    feedback.classList.add("hidden");
    feedback.classList.remove("correct", "incorrect");
    feedback.innerHTML = "";
  
    answeredCurrentQuestion = false;
  }
  
  function checkPracticeAnswer(userAnswer) {
    if (answeredCurrentQuestion) return;
  
    const q = practiceQuestions[currentPracticeIndex];
    const feedback = document.getElementById("practiceFeedback");
  
    if (userAnswer === q.answer) {
      practiceScore++;
      feedback.classList.add("correct");
      feedback.innerHTML = `
        <strong>Correct.</strong><br>
        This is an <strong>${capitalize(q.answer)}</strong> clause.<br>
        <span>${q.explanation}</span>
      `;
    } else {
      feedback.classList.add("incorrect");
      feedback.innerHTML = `
        <strong>Not quite.</strong><br>
        The correct answer is <strong>${capitalize(q.answer)}</strong>.<br>
        <span>${q.explanation}</span>
      `;
    }
  
    document.getElementById("scoreText").textContent = `Score: ${practiceScore}`;
    feedback.classList.remove("hidden");
    answeredCurrentQuestion = true;
  }
  
  function nextPracticeQuestion() {
    if (currentPracticeIndex < practiceQuestions.length - 1) {
      currentPracticeIndex++;
      renderPracticeQuestion();
    } else {
      finishPractice();
    }
  }
  
  function finishPractice() {
    const feedback = document.getElementById("practiceFeedback");
    document.getElementById("progressFill").style.width = "100%";
    feedback.classList.remove("hidden");
    feedback.classList.remove("incorrect");
    feedback.classList.add("correct");
    feedback.innerHTML = `
      <strong>Quiz complete.</strong><br>
      Final score: <strong>${practiceScore} / ${practiceQuestions.length}</strong><br>
      ${getScoreMessage(practiceScore, practiceQuestions.length)}
    `;
  }
  
  function resetPractice() {
    currentPracticeIndex = 0;
    practiceScore = 0;
    renderPracticeQuestion();
  }
  
  function getScoreMessage(score, total) {
    const ratio = score / total;
    if (ratio === 1) return "Perfect. You clearly know the difference.";
    if (ratio >= 0.8) return "Strong work. You mostly understand this.";
    if (ratio >= 0.6) return "Decent, but you still need more reps.";
    return "You need more practice. You’re still guessing too much.";
  }
  
  // ------------------------------
  // ANALYZER
  // rule-based, simple, honest
  // ------------------------------
  const subordinators = [
    "because", "although", "since", "when", "while", "if",
    "unless", "after", "before", "even though", "though", "as",
    "once", "until", "whenever", "whereas"
  ];
  
  const commonVerbs = [
    "is", "are", "was", "were", "be", "been", "being",
    "run", "runs", "ran", "eat", "eats", "ate", "finish", "finished",
    "go", "goes", "went", "laugh", "laughed", "cry", "cried",
    "start", "started", "win", "wins", "won", "miss", "missed",
    "look", "looked", "pretend", "pretends", "fix", "fixed",
    "do", "does", "did", "send", "sends", "sent", "study", "studied",
    "bark", "barked", "sleep", "slept", "rain", "rained", "fell",
    "knocked", "keep", "kept", "watch", "watched"
  ];
  
  function analyzeClause() {
    const input = document.getElementById("analyzerInput").value.trim();
    const result = document.getElementById("analyzerResult");
  
    if (!input) {
      result.classList.remove("hidden");
      result.innerHTML = "<strong>Enter something first.</strong>";
      return;
    }
  
    const lower = input.toLowerCase().trim();
    const words = lower.split(/\s+/);
  
    const startsWithSubordinator = subordinators.some(word => lower.startsWith(word + " ")) || subordinators.includes(lower);
    const hasLikelyVerb = words.some(word => commonVerbs.includes(word) || word.endsWith("ed") || word.endsWith("ing"));
    const hasEnoughWords = words.length >= 2;
  
    let classification = "";
    let explanation = "";
  
    if (startsWithSubordinator && hasLikelyVerb) {
      classification = "Likely Dependent Clause";
      explanation = "It appears to begin with a subordinating word like 'because', 'when', or 'although', which usually makes the clause dependent.";
    } else if (!startsWithSubordinator && hasLikelyVerb && hasEnoughWords) {
      classification = "Likely Independent Clause";
      explanation = "It appears to contain enough structure to stand alone as a complete thought.";
    } else {
      classification = "Unclear / Incomplete Input";
      explanation = "This input may be too short or missing enough grammatical structure to classify confidently.";
    }
  
    result.classList.remove("hidden");
    result.innerHTML = `
      <strong>${classification}</strong><br>
      ${explanation}
    `;
  }
  
  function clearAnalyzer() {
    document.getElementById("analyzerInput").value = "";
    document.getElementById("analyzerResult").classList.add("hidden");
    document.getElementById("analyzerResult").innerHTML = "";
  }
  
  function loadAnalyzerExample() {
    document.getElementById("analyzerInput").value = "Although the dog looked guilty";
    analyzeClause();
  }
  
  // ------------------------------
  // CLAUSE BUILDER
  // ------------------------------
  const dependentStarters = [
    "Because I forgot my alarm",
    "When the movie ended",
    "Although the robot looked broken",
    "If the pizza arrives",
    "While my friend was studying",
    "Since the rain started"
  ];
  
  const independentClauses = [
    "I ran to school.",
    "everyone cheered loudly.",
    "it still finished the task.",
    "we will finally eat.",
    "I kept sending memes.",
    "the game was delayed."
  ];
  
  let selectedStarter = "";
  let selectedIndependent = "";
  
  function renderBuilderOptions() {
    const starterContainer = document.getElementById("starterButtons");
    const independentContainer = document.getElementById("independentButtons");
  
    starterContainer.innerHTML = "";
    independentContainer.innerHTML = "";
  
    dependentStarters.forEach(starter => {
      const btn = document.createElement("button");
      btn.className = "pill-btn";
      btn.textContent = starter;
      btn.onclick = () => selectStarter(starter, btn);
      starterContainer.appendChild(btn);
    });
  
    independentClauses.forEach(clause => {
      const btn = document.createElement("button");
      btn.className = "pill-btn";
      btn.textContent = clause;
      btn.onclick = () => selectIndependent(clause, btn);
      independentContainer.appendChild(btn);
    });
  }
  
  function selectStarter(starter, buttonEl) {
    selectedStarter = starter;
    document.querySelectorAll("#starterButtons .pill-btn").forEach(btn => btn.classList.remove("selected"));
    buttonEl.classList.add("selected");
  }
  
  function selectIndependent(clause, buttonEl) {
    selectedIndependent = clause;
    document.querySelectorAll("#independentButtons .pill-btn").forEach(btn => btn.classList.remove("selected"));
    buttonEl.classList.add("selected");
  }
  
  function buildSentence() {
    const output = document.getElementById("builderSentence");
  
    if (!selectedStarter || !selectedIndependent) {
      output.textContent = "Pick both parts first. Don’t skip steps.";
      return;
    }
  
    output.textContent = `${selectedStarter}, ${selectedIndependent}`;
  }
  
  function resetBuilder() {
    selectedStarter = "";
    selectedIndependent = "";
    document.getElementById("builderSentence").textContent = "Nothing built yet.";
    document.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("selected"));
  }
  
  // ------------------------------
  // RANDOM GENERATOR
  // ------------------------------
  const generatedIndependent = [
    "The hamster escaped the cage.",
    "My teacher dropped the marker.",
    "The scientist checked the results.",
    "We finished the project.",
    "The baby dragon sneezed.",
    "I forgot my lunch."
  ];
  
  const generatedDependent = [
    "Because the hamster escaped the cage",
    "When my teacher dropped the marker",
    "Although the scientist checked the results",
    "If we finish the project",
    "Since the baby dragon sneezed",
    "While I forgot my lunch"
  ];
  
  let currentGenerated = {
    text: "",
    type: ""
  };
  
  function generateSentence() {
    const useIndependent = Math.random() < 0.5;
    let text = "";
    let type = "";
  
    if (useIndependent) {
      text = generatedIndependent[Math.floor(Math.random() * generatedIndependent.length)];
      type = "Independent Clause";
    } else {
      text = generatedDependent[Math.floor(Math.random() * generatedDependent.length)];
      type = "Dependent Clause";
    }
  
    currentGenerated.text = text;
    currentGenerated.type = type;
  
    document.getElementById("generatedSentence").textContent = text;
    const answerBox = document.getElementById("generatedAnswer");
    answerBox.classList.add("hidden");
    answerBox.classList.remove("correct", "incorrect");
    answerBox.innerHTML = "";
  }
  
  function revealGeneratedAnswer() {
    const answerBox = document.getElementById("generatedAnswer");
  
    if (!currentGenerated.text) {
      answerBox.classList.remove("hidden");
      answerBox.classList.add("incorrect");
      answerBox.innerHTML = "Generate a sentence first.";
      return;
    }
  
    answerBox.classList.remove("hidden");
    answerBox.classList.add("correct");
    answerBox.innerHTML = `
      <strong>${currentGenerated.type}</strong><br>
      ${currentGenerated.type === "Independent Clause"
        ? "This can stand alone as a complete thought."
        : "This cannot stand alone as a complete thought."}
    `;
  }
  
  // ------------------------------
  // HELPERS
  // ------------------------------
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  // ------------------------------
  // INIT
  // ------------------------------
  renderFlashcard();
  renderPracticeQuestion();
  renderBuilderOptions();
