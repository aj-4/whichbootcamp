#!/bin/bash
# adds a bootcamp from tsv

while IFS=$'\t' read -r id name verified camel websiteURL logoURL miniLogoURL locations languages programs bcColor || [ -n "$id" ]
do

status_code=$(curl -s -o  /dev/null -w "%{http_code}" \
  -X POST \
  http://localhost:3000/api/bootcamps \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode id="$id" \
  --data-urlencode name="$name" \
  --data-urlencode verified="$verified" \
  --data-urlencode camel="$camel" \
  --data-urlencode websiteURL="$websiteURL" \
  --data-urlencode logoURL="$logoURL" \
  --data-urlencode miniLogoURL="$miniLogoURL" \
  --data-urlencode locations="$locations" \
  --data-urlencode languages="$languages" \
  --data-urlencode programs="$programs" \
  --data-urlencode bcColor="$bcColor")

printf "%-50s%s\n" "$name" "$status_code"

done < $1
