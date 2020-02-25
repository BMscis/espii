from crontab import CronTab

espii_cron = CronTab(user='root')
job = espii_cron.new(command='sudo python2 acr_callback_api.py >> cron.log',comment='callback')
job2 = espii_cron.new(command='sudo python2 db_sort.py >> cron.log',comment='call_database')
job.minute.every(5)
job2.minute.every(5)
espii_cron.write()

'''
with open('cron.log', 'wb') as fille:
    for job in espii_cron:
        fille.writelines(job)
espii_cron.remove_all()
espii_cron.write()
'''