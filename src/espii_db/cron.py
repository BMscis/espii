from crontab import CronTab

espii_cron = CronTab(user='melvinwafula')

with open('cron.log', 'wb') as fille:
    for job in espii_cron:
        fille.writelines(job)
