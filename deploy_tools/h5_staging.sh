#!/bin/bash

local_dir=".."
config="staging"
ssh_config="staging"
make_dir="dist"

PATH=$PATH:./libs/

bash _make_h5_2.sh ${local_dir} ${config} ${make_dir} &&

bash _ui.sh ${local_dir}/${make_dir} ${ssh_config} "/data/apps/" &&

bash _git.sh ${local_dir} ${config}
