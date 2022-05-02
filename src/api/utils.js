module.exports = {
    unwrapResponse: async function (answer) {
        answer = await answer
        if ('result' in answer) {
            return answer.result
        } else {
            throw answer.error
        }
    },
}
