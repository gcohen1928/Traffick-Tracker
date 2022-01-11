import React, {useEffect } from 'react'
import { View, BackHandler, Text} from 'react-native'
import { Title, SubTitle, QuestionContainer, Question, Line, Answer} from '../components/instructions/instructions.component'

export const ReportSuccess = () => {

    return (
        <View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Title>
                Report submitted!
            </Title>
            <SubTitle>

            </SubTitle>
            <QuestionContainer style ={{height: 200}}>
                <Line>
                    <Question style ={{fontWeight: 'bold'}}>
                        Thanks for submitting a report!
                    </Question>
                    </Line>
                    <Answer>
                    Your report is has been sent to our database and to the National Human Traficking Hotline!
                    </Answer>
                
            </QuestionContainer>
        </View>

    )
}