class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
  }

  removeMeal(meal) {}

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= Math.floor(Math.log(workout.calories) * 10);
  }

  removeWorkout(workout) {}

  resetDay() {}

  setLimit() {}

  loadItems() {}

  _displayCaloriesTotal() {}
  _displayCalorieLimit() {}
  _displayCaloriesConsumed() {}
  _displayCaloriesBurned() {}
  _displayCaloriesRemaining() {}
  _displayNewMeal() {}
  _displayNewWorkout() {}
  _renderStats() {}
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
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
tracker.addMeal(breakfast);

const run = new Workout('Run', 200);
tracker.addWorkout(run);

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalories);
