
export const GetList = () => {

    fetch('http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/10')
        .then(data => data.json())
}

export const GetSingle = () => {

}