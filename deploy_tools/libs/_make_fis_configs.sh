#!/bin/bash

dir=$1
fis_cfg_dir="fis-cfgs"

if [ -e ${dir}/${fis_cfg_dir} ]; then
	echo dir aready exits
else
	mkdir ${dir}/${fis_cfg_dir}
fi

enviroment_dir_name="enviroment"
str_enviroment=$(ls ${dir}/${enviroment_dir_name}/ | sort)
arr_enviroment=(${str_enviroment// / })
enviroment_file_name="env.json"

tpl=$(cat ${dir}/deploy_tools/fis-conf.js)

for i in ${arr_enviroment[@]} 
do
    domain=$(jq '.domain' ${dir}/${enviroment_dir_name}/${i}/${enviroment_file_name})
    echo "fis.config.merge({ roadmap : { domain : \""${domain}"\" } });"${tpl} > ${dir}/${fis_cfg_dir}/"fis-"${i}"-conf.js"
done
