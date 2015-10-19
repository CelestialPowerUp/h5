#!/bin/bash

echo $1-\>$2-\>$3\($4\) &&

echo "making fis configs." &&
bash _make_fis_configs.sh $1 &&
echo "done." &&

echo "copy file to tmp folder.." &&
mkdir -p $1/tmp/ &&
cp -a $1/webapp/* $1/tmp/ &&
cp -a $1/enviroment/$2/* $1/tmp/map/ &&
echo "done.." &&

if [ -e $1/$3 ]; then
    rm -rf $1/$3/
fi
mkdir -p $1/$3 &&
fis release -comp -r $1/tmp/ -f $1/"fis-cfgs"/"fis-"$2$4"-conf.js" -d $1/$3 -D &&

echo "copy json configs..." &&
bash _cp_json.sh $1/enviroment/$2 $1/platform/normal $1/$3 &&
echo "done..." &&

echo "clean tmp folder...." &&
rm -rf $1/tmp/ &&
echo "done...." &&

echo "well done!!!"
