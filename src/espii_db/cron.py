from crontab import CronTab

espii_cron = CronTab(user='root')
job = espii_cron.new(command='python2 /var/www/html/espii/src/espii_db/acr_callback_api.py',comment='callback')
job2 = espii_cron.new(command='python2 /var/www/html/espii/src/espii_db/db_sort.py',comment='call_database')
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