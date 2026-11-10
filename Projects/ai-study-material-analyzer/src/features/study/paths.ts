const paths ={
    home(){
        return '/';
    },
    plannerShow(topicSlug?: string){
        return `/planner/${topicSlug}`
    },
    plannerHome(){
        return `/planner`;
    }
}
export default paths;