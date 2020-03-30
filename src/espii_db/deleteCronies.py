from crontab import CronTab

espii_cron = CronTab(user='root')
with open('cron.log', 'wb') as fille:
    for job in espii_cron:
        fille.writelines(job)
espii_cron.remove_all()
espii_cron.write()