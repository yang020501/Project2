class WRT(object):
    def __init__(self, data):
        self.data = data
        self.c = self.data['vote_average'].mean()
        self.m = self.data['vote_count'].quantile(0.9)

    def cutdown_movie_with_m(self):
        self.data = self.data.loc[self.data['vote_count'] >= self.m]

    def recommend_top_10(self): 
        self.cutdown_movie_with_m()

        m = self.m
        C = self.c

        def weighted_rating(x, m=m, C=C):
            v = x['vote_count']
            R = x['vote_average']
            # Calculation based on the IMDB formula
            return (v/(v+m) * R) + (m/(m+v) * C)

        self.data['score'] = self.data.apply(weighted_rating, axis=1)
        top10 = self.data.sort_values('popularity', ascending=False)
        return top10