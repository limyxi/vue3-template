node {

//    配置项
    def remote1 = [:]
    remote1.name = "jifen"
    remote1.host = "192.168.0.94"
    remote1.user = "root"
    remote1.password = "4dj4kah#djckc2993j2dajD3995"
    remote1.allowAnyHosts = true

    def remote2 = [:]
    remote2.name = "jifen2"
    remote2.host = "192.168.0.94"
    remote2.user = "root"
    remote2.password = "4dj4kah#djckc2993j2dajD3995"
    remote2.allowAnyHosts = true

    //配置项
    def remoteList = [remote1, remote2]

    //配置项
    def project = "/home/projects/dianmao/ui"

    //配置项
    def profileList = ["build", "build:prod"]

    def remoteNameList = []
    for (def a in remoteList) {
        remoteNameList += a.name;
    }

    def module = "."

    properties([
            parameters([
                    gitParameter(branch: "",
                            branchFilter: "origin/(.*)",
                            defaultValue: "master",
                            description: "",
                            name: "branch",
                            quickFilterEnabled: false,
                            selectedValue: "NONE",
                            sortMode: "NONE",
                            tagFilter: "*",
                            type: "PT_BRANCH"),
                    choice(name: "profile", choices: profileList),
                    choice(name: "server", choices: remoteNameList)
            ])
    ])

    def branch = "${params.branch}"
    def profile = "${params.profile}"
    def server = "${params.server}"

    echo branch
    echo profile
    echo server

    stage("Preparation") {

        checkout([$class                           : "GitSCM",
                  branches                         : [[name: "${params.branch}"]], // 传入分支
                  doGenerateSubmoduleConfigurations: false,
                  extensions                       : [],
                  gitTool                          : "Default",
                  submoduleCfg                     : [],
                  userRemoteConfigs                : scm.userRemoteConfigs // ！重要，复用我们在 Jenkins 上 SCM 配置，如凭据、仓库地址
        ])

    }
    stage("Build") {

        echo "build"

        nodejs("node"){
            sh "npm install"
            sh "npm run "+profile
        }

    }
    stage("Deploy") {

        def remote = null;
        for (def a in remoteList) {
            if (a.name == server) {
                remote = a
            }
        }

        sshPut remote: remote, from: "dist/", into: project+"/tmp"
        sshCommand remote: remote, command: "rm -rf " + project + "/dist"
        sshCommand remote: remote, command: "mv " + project + "/tmp/dist " + project + "/dist"

    }
}
