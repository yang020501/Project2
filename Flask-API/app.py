from flask import Flask
from Recommend.CF_model import CF
from Recommend.Weight_rating_model import WRT
import pandas as pd
import joblib as jb
import numpy as np
import json as js
from flask.json import jsonify
app = Flask(__name__)

@app.route("/begin", methods=['GET', 'POST'])
def begin_train():
    movies = pd.read_csv('./Dataset/tmdb_5000_movies.csv', usecols=['id', 'title', 'genres', 'original_language', 'release_date', 'vote_average', 'vote_count', 'popularity'])
    
    re = WRT(movies)
    q_movies = re.recommend_top_10()

    listOfMovie= [(Movie(row.id, row.title, row.genres, row.original_language, row.release_date, row.vote_average)) for index, row in q_movies.iterrows()]
    listOf10Movie = listOfMovie[0:10]

    jsonStr = js.dumps([ob.__dict__ for ob in listOf10Movie])

    return jsonify(jsonStr)


@app.route("/load-old/<model_name>/<int:customer_id>", methods=['GET','POST'])
def load_old_model(model_name, customer_id):

    def load_model(model_name):
        model = jb.load('./TrainedModel/' + model_name + '_model.pkl')
        return model

    re = load_model(model_name)

    ids_movie_recommend = re.recommend2(customer_id)
    ids_movie_not_rate_by_user = get_items_rated_by_user(re.Y_data , customer_id)

    result = remove_items_exist_in_list2(ids_movie_recommend, ids_movie_not_rate_by_user)
    movie_data = pd.read_csv('./Dataset/tmdb_5000_movies.csv', usecols=['id', 'title', 'genres', 'original_language', 'release_date', 'vote_average'])

    movies_data_not_rate = movie_data.loc[movie_data['id'].isin(result)]
    #df_movie_afterS = movies_data_not_rate.sort_values('vote_average', ascending=False)

    listOfMovie= [(Movie(row.id, row.title, row.genres, row.original_language, row.release_date, row.vote_average)) for index, row in movies_data_not_rate.iterrows()]
    listOf10Movie = listOfMovie[0:10]
    jsonStr = js.dumps([ob.__dict__ for ob in listOf10Movie])
    return jsonStr


@app.route("/train/<model_name>")
def train_model(model_name):
    df = pd.read_csv('./Dataset/ratings_small.csv', usecols=['userId', 'movieId', 'rating'])
    data = df.values
    re = CF(data, k=30, uuCF=1)
    re.fit()
    store_model(re, model_name)
    return model_name + ' has been trained'

def get_items_rated_by_user(rate_matrix, user_id):
    
    y = rate_matrix[:, 0]  # all users

    ids = np.where(y == (user_id + 1))[0]
    tmp_ids = []
    for item in ids:
        if item.size > 0:
            tmp_ids.append(item)
    
    item_ids = rate_matrix[tmp_ids,1] - 1  # index starts from 0
   
    # print(ids)
    return item_ids

def remove_items_exist_in_list2(list1, list2):
    res = [i for i in list1 if i not in list2]
    return res

def store_model(model, model_name):
    if model_name == "":
        model_name = type(model).__name__
    jb.dump(model, './TrainedModel/' + model_name + '_model.pkl')


class Movie:

    def __init__(self, id, title, genres, category, release ,vote):
        self.id = id
        self.title = title
        self.genres = genres
        self.category = category
        self.release = release
        self.vote = vote
    
    def __repr__(self):
        return f'{self.__class__.__name__}> (id={self.id}, title={self.title}, genres={self.title}, vote={self.vote})'
