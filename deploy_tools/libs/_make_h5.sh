#!/bin/bash

echo $1-\>$2-\>$3 &&

echo "making fis configs." &&
bash _make_fis_configs.sh $1 &&
echo "done." &&

echo "copy file to tmp folder.." &&
mkdir -p $1/tmp/ &&
cp -a $1/webapp/* $1/tmp/ &&
cp -a $1/enviroment/$2/* $1/tmp/map/ &&
echo "done.." &&

mkdir -p $1/$3 &&
fis release -comp -r $1/tmp/ -f $1/"fis-cfgs"/"fis-"$2"-conf.js" -d $1/$3 -D &&

echo "clean tmp folder..." &&
rm -rf $1/tmp/ &&
echo "done..." &&

echo "well done!!!"
