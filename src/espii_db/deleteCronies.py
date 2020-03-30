from crontab import CronTab

espii_cron = CronTab(user='root')

espii_cron.remove_all()
espii_cron.write()