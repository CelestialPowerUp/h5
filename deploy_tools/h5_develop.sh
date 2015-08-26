#!/bin/bash

local_dir=".."
config="develop"
make_dir="h5-"${config}

PATH=$PATH:./libs/

bash _make_h5.sh ${local_dir} ${config} ${make_dir} &&

bash _ui.sh 123.59.52.186 yangaiche@test766 "/data/apps" ${local_dir}/${make_dir} &&

bash _git.sh ${local_dir} ${config}
