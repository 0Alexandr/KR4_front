const loadRecipesFromApi = async () => {
  setLoadingApi(true);
  setApiError('');

  try {
    const current = JSON.parse(localStorage.getItem('techTrackerData') || '[]');
    const existingIds = new Set(current.map(t => t.id));           // по ID
    const existingTitles = new Set(current.map(t => t.title.toLowerCase())); // по названию (на всякий случай)

    const newRecipes = [];

    // Пробуем загрузить до 10 уникальных рецептов
    let attempts = 0;
    while (newRecipes.length < 10 && attempts < 50) { // 50 попыток — защита от зацикливания
      attempts++;
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!res.ok) continue;

      const data = await res.json();
      const recipe = data.meals?.[0];
      if (!recipe) continue;

      const recipeId = `recipe-${recipe.idMeal}`;
      const titleLower = recipe.strMeal.toLowerCase();

      // Проверяем: нет ли уже по ID или названию
      if (!existingIds.has(recipeId) && !existingTitles.has(titleLower)) {
        newRecipes.push({
          id: recipeId,
          title: recipe.strMeal,
          description: recipe.strInstructions.substring(0, 250) + '...', // коротко для карточки
          fullInstructions: recipe.strInstructions, // ← ПОЛНЫЙ РЕЦЕПТ!
          status: 'not-started',
          notes: '',
          image: recipe.strMealThumb,
          category: recipe.strCategory,
          area: recipe.strArea
        });

        // Добавляем в наборы, чтобы не повторился в этой же сессии
        existingIds.add(recipeId);
        existingTitles.add(titleLower);
      }
      await new Promise(r => setTimeout(r, 300));
    }

    if (newRecipes.length === 0) {
      setApiError('Больше нет новых рецептов! Все доступные уже загружены');
      setLoadingApi(false);
      return;
    }

    // Сохраняем
    current.push(...newRecipes);
    localStorage.setItem('techTrackerData', JSON.stringify(current));

    alert(`Успешно добавлено ${newRecipes.length} новых рецептов!`);
    window.location.reload();

  } catch (err) {
    setApiError('Ошибка: ' + err.message);
  } finally {
    setLoadingApi(false);
  }
};