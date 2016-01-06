#!/bin/bash

echo $1-\>$2-\>$3 &&

fixedDir=$3

if [ -e $1/${fixedDir} ]; then
    rm -rf $1/${fixedDir}/
fi
mkdir -p $1/${fixedDir} &&

cd $1 &&

gulp build --dstRoot ${fixedDir} && gulp rev --dstRoot ${fixedDir} &&

cd "deploy_tools" &&

echo "copy json configs..." &&
bash _cp_json.sh $1/enviroment/$2 $1/platform/normal $1/${fixedDir} &&
echo "done..." &&

echo "well done!!!"
