git pull
yarn run build
pm2 delete "Nobo-next-js"
pm2 start npm --name "Nobo-next-js" -- start
