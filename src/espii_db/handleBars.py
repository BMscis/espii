from db_sort import Espii
import multiprocessing

class handlers(Espii):
    def __init__(self, user,password,channel_id):
        Espii.__init__(self,user,password,channel_id)

    def create_queue(self):
        q = multiprocessing.Queue()

bar = handlers('root','Meddickmeddick6','log10')
print(bar.user)