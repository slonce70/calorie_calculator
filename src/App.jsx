import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from '@react-spring/web'
import { GiBodyHeight, GiWeight, GiWaterDrop } from 'react-icons/gi'
import { MdFitnessCenter, MdOutlineCalculate } from 'react-icons/md'

// Стилизованные компоненты
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({theme}) => theme.colors.background};
  border-radius: 15px;
  box-shadow: ${({theme}) => theme.shadows.soft};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1rem;
  }
`

const FormWrapper = styled.form`
  display: grid;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.secondary};
  }

  input, select {
    padding: 0.8rem;
    border: 2px solid ${({theme}) => theme.colors.primary};
    border-radius: 8px;
    font-size: 1rem;
    background: white;
    
    &:focus {
      outline: none;
      border-color: ${({theme}) => theme.colors.accent};
    }
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  background: ${({theme}) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({theme}) => theme.colors.accent};
    transform: translateY(-2px);
  }
`

const ResultsWrapper = styled(animated.div)`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${({theme}) => theme.colors.background};
  border-radius: 12px;
`

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 1.1rem;
  color: ${({theme}) => theme.colors.secondary};
`

const Recommendations = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 2px solid ${({theme}) => theme.colors.primary};

  h3 {
    margin-top: 0;
    color: ${({theme}) => theme.colors.primary};
  }

  ul {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  li {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
`

// Основной компонент
const Calculator = () => {
  const [userData, setUserData] = useState({
    age: 25,
    weight: 70,
    height: 175,
    gender: 'male',
    activity: 1.2,
    goal: 'maintain'
  })

  const [results, setResults] = useState(null)

  const calculateCalories = useCallback(() => {
    const { age, weight, height, gender, activity, goal } = userData
    const numericWeight = Number(weight)
    const numericHeight = Number(height)
    const numericAge = Number(age)

    let bmr = gender === 'male' 
      ? 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge + 5
      : 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge - 161
    
    const tdee = bmr * Number(activity)
    const goalFactors = {
      lose: 0.85,
      maintain: 1,
      gain: 1.15
    }
    
    return {
      calories: Math.round(tdee * goalFactors[goal]),
      water: Math.round(numericWeight * 35)
    }
  }, [userData])

  const fadeIn = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 }
  })

  const resultsAnimation = useSpring({
    from: { opacity: 0, height: 0 },
    to: { opacity: results ? 1 : 0, height: results ? 'auto' : 0 },
    config: { mass: 1, tension: 200, friction: 20 }
  })

  const getRecommendations = (goal) => {
    const recommendations = {
      lose: [
        'Создайте дефицит 300-500 ккал в день',
        'Увеличьте потребление белка',
        'Добавьте кардио тренировки 3-4 раза в неделю'
      ],
      maintain: [
        'Поддерживайте баланс калорий',
        'Сбалансированное питание',
        'Регулярные тренировки 3-5 раз в неделю'
      ],
      gain: [
        'Профицит 300-500 ккал в день',
        'Увеличьте потребление сложных углеводов',
        'Силовые тренировки 4-5 раз в неделю'
      ]
    }
    return recommendations[goal] || []
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setResults(calculateCalories())
  }

  return (
    <Container>
      <animated.div style={fadeIn}>
        <FormWrapper onSubmit={handleSubmit}>
          <h1><MdOutlineCalculate /> Калькулятор калорий</h1>
          
          <InputGroup>
            <label><GiBodyHeight /> Возраст</label>
            <input
              type="number"
              min="10"
              max="100"
              value={userData.age}
              onChange={e => setUserData({...userData, age: e.target.value})}
            />
          </InputGroup>

          <InputGroup>
            <label><GiWeight /> Вес (кг)</label>
            <input
              type="number"
              min="30"
              max="300"
              value={userData.weight}
              onChange={e => setUserData({...userData, weight: e.target.value})}
            />
          </InputGroup>

          <InputGroup>
            <label>Рост (см)</label>
            <input
              type="number"
              min="100"
              max="250"
              value={userData.height}
              onChange={e => setUserData({...userData, height: e.target.value})}
            />
          </InputGroup>

          <InputGroup>
            <label>Пол</label>
            <select
              value={userData.gender}
              onChange={e => setUserData({...userData, gender: e.target.value})}
            >
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </InputGroup>

          <InputGroup>
            <label>Активность</label>
            <select
              value={userData.activity}
              onChange={e => setUserData({...userData, activity: e.target.value})}
            >
              <option value="1.2">Сидячий образ жизни</option>
              <option value="1.375">Легкая активность</option>
              <option value="1.55">Умеренная активность</option>
              <option value="1.725">Высокая активность</option>
              <option value="1.9">Экстремальная активность</option>
            </select>
          </InputGroup>

          <InputGroup>
            <label>Цель</label>
            <select
              value={userData.goal}
              onChange={e => setUserData({...userData, goal: e.target.value})}
            >
              <option value="lose">Похудение</option>
              <option value="maintain">Поддержание веса</option>
              <option value="gain">Набор массы</option>
            </select>
          </InputGroup>

          <Button type="submit">Рассчитать</Button>
        </FormWrapper>

        <ResultsWrapper style={resultsAnimation}>
          {results && (
            <>
              <h2><MdFitnessCenter /> Результаты</h2>
              <ResultItem>
                <GiWaterDrop /> Вода: {results.water} мл/день
              </ResultItem>
              <ResultItem>
                🍴 Калории: {results.calories} ккал/день
              </ResultItem>
              
              <Recommendations>
                <h3>Рекомендации</h3>
                <ul>
                  {getRecommendations(userData.goal).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Recommendations>
            </>
          )}
        </ResultsWrapper>
      </animated.div>
    </Container>
  )
}

export default Calculator
