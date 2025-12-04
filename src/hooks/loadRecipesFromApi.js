const loadRecipesFromApi = async () => {
  setLoadingApi(true);
  setApiError('');

  try {
    const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegetarian']; // 9 категорий
    const recipes = [];

    for (const category of categories) {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (!res.ok) continue;

      const data = await res.json();
      const meals = data.meals || [];

      // Берём первый рецепт из категории
      if (meals.length > 0) {
        const mealId = meals[0].idMeal;
        const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        if (detailRes.ok) {
          const detailData = await detailRes.json();
          const recipe = detailData.meals[0];
          recipes.push({
            id: `recipe-${recipe.idMeal}`,
            title: recipe.strMeal,
            description: recipe.strInstructions.substring(0, 200) + '...', // Короткое описание (первые 200 символов)
            status: 'not-started',
            notes: '',
            image: recipe.strMealThumb // Для карточки, если нужно
          });
        }
        // Задержка 500 мс между запросами
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (recipes.length === 0) throw new Error('Не удалось загрузить ни одного рецепта');

    const current = JSON.parse(localStorage.getItem('techTrackerData') || '[]');
    const existingTitles = new Set(current.map(t => t.title));
    const uniqueNew = recipes.filter(r => !existingTitles.has(r.title));

    if (uniqueNew.length === 0) {
      setApiError('Все рецепты уже загружены!');
    } else {
      current.push(...uniqueNew);
      localStorage.setItem('techTrackerData', JSON.stringify(current));
      alert(`Успешно добавлено ${uniqueNew.length} новых рецептов!`);
      window.location.reload();
    }
  } catch (err) {
    setApiError('Ошибка загрузки: ' + err.message);
  } finally {
    setLoadingApi(false);
  }
};