import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../sass/Article.sass';
import { fetchArticle } from "../actions/ArticleActions";

const Article = (props) => {
    const article = useSelector(state => state.article);
    const dispatch = useDispatch();

    // TODO which is this called twise in network tab? Fix this
    useEffect(() => {
        if (!article.data) {
            dispatch(fetchArticle())
        }
    }, [])

    return (
        <div>
            <h1>Article</h1>
            <h1>article: {article.data && article.data.body}</h1>
        </div>
    );
}
export default Article;