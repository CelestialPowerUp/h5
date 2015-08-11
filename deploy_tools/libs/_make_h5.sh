#!/bin/bash

echo making fis configs &&
bash _make_fis_configs.sh $1 &&
echo "done" &&

echo $1-\>$2-\>$3 &&

mkdir -p $1/$3 &&
cp -a $1/webapp/* $1/tmp/ &&
cp -a $1/enviroment/$2/* $1/tmp/map/ &&
fis release -comp -r $1/tmp/ -f $1/"fis-cfgs"/"fis-"$2"-conf.js" -d $1/$3 -D &&

echo "done..."