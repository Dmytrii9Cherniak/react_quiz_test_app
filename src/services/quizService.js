import { environment } from '../environments/environment';

export const quizService = {

    getAllTestsQuestions: function (categoryId) {
        return fetch(`${environment.apiUrl}/api.php?amount=10&category=${categoryId}`).then(res => res.json())
    },

    getAllTestCategories: function () {
        return fetch(`${environment.apiUrl}/api_category.php`).then((res) => res.json())
    }


}