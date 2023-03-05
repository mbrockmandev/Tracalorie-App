class CalorieTracker {
  constructor() {
    this._calorieLimit = 2100;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    // brad manually calls methods here instead
    this._renderStats();
  }

  // Public Methods/API //

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    this._renderStats();
  }

  removeMeal(meal) {}

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;

    this._renderStats();
  }

  removeWorkout(workout) {
    this._renderStats();
  }

  resetDay() {
    this._renderStats();
  }

  setLimit() {
    this._renderStats();
  }

  loadItems() {
    this._renderStats();
  }

  // Private Methods //

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCalorieLimit() {
    const calorieLimitEl = document.getElementById('calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }
  _displayCaloriesRemaining() {
    const progressEl = document.getElementById('calorie-progress');
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining < 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const pct = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(pct, 100);
    progressEl.style.width = `${width}%`;
  }
  _displayNewMeal() {}
  _displayNewWorkout() {}
  _renderStats() {
    this._displayCaloriesTotal();
    this._displayCalorieLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = Math.floor(Math.log(calories) * 20);
    // this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newMeal.bind(this));

    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();

    const name = document.getElementById('meal-name');
    const calories = document.getElementById('meal-calories');

    // validate inputs
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields.');
      return;
    }

    const meal = new Meal(name.value, +calories.value);

    this._tracker.addMeal(meal);
    name.value = '';
    calories.value = '';

    const collapseMeal = document.getElementById('collapse-meal');
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    });
  }

  _newWorkout(e) {
    e.preventDefault();

    const name = document.getElementById('workout-name');
    const calories = document.getElementById('workout-calories');

    // validate inputs
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields.');
      return;
    }

    const workout = new Workout(name.value, +calories.value);

    this._tracker.addWorkout(workout);
    name.value = '';
    calories.value = '';

    const collapseWorkout = document.getElementById('collapse-workout');
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}

const app = new App();
