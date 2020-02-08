import { Grid, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import './App.css';
import { useGlobal, getGlobal, setGlobal } from "reactn";
import { MALE, FEMALE } from './LifeData';
import { Share } from './Share';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      color: "white",
      margin: theme.spacing(3),
    },
    formLabel: {
      color: "white",
      margin: theme.spacing(3),
    },
    select: {
      color: "white",
      margin: theme.spacing(3),
    },
  }),
);

const App = () => {
  const [gender, setGender] = useState('male');
  const [luckS, setLuck] = useState("0.01")
  const [startAgeS, setAge] = useState("38")
  const startAge = parseInt(startAgeS);
  const luck = parseFloat(luckS);
  let alive = 1.0;
  let age = startAge;

  const getRate = (age: number) => {
    if (gender === "male") {
      return MALE[age];
    } else if (gender === "female") {
      return FEMALE[age];
    }
    return (MALE[age] + FEMALE[age]) / 2;
  }
  while (true) {
    alive *= (1 - getRate(age));
    age++;
    console.log(age, alive)
    if (alive === 0 || 1 - alive > luck) {
      break;
    }
  }

  const changeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };
  const chengeLuck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLuck((event.target as HTMLInputElement).value);
  };
  const changeAge = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge((event.target as HTMLInputElement).value);
  };
  let genderString;
  if (gender === "male") {
    genderString = "男性"
  } else if (gender === "female") {
    genderString = "女性"
  } else {
    genderString = "人"
  }
  const result = `あなたは${age - startAge}年後に${age}歳で死にます。`;

  const classes = useStyles();
  const ageList = [];
  for (let i = 0; i < 101; i++) {
    ageList.push(<MenuItem value={i}>{i}</MenuItem>)
  }

  return (
    <div className="App">
      <h1>○年後に死ぬあなた</h1>
      漫画「100年後に死ぬワニ」を見てたら自分が何年後に死ぬのか気になったので作りました。

      <div className="form">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.formLabel}>あなたの今の年齢</FormLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={startAge}
                  onChange={changeAge}
                  className={classes.select}
                >
                  {ageList}
                </Select>
              </FormControl>

            </Grid>
            <Grid>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.formLabel}>あなたの性別</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={gender} onChange={changeGender}>
                  <FormControlLabel value="male" control={<Radio />} label="男性" />
                  <FormControlLabel value="female" control={<Radio />} label="女性" />
                  <FormControlLabel value="other" control={<Radio />} label="平均" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.formLabel}>あなたの運</FormLabel>
                <RadioGroup aria-label="luck" name="luck" value={luckS} onChange={chengeLuck}>
                  <FormControlLabel value="0.001" control={<Radio />} label="1000人に1人の悪さ" />
                  <FormControlLabel value="0.01" control={<Radio />} label="100人に1人の悪さ" />
                  <FormControlLabel value="0.1" control={<Radio />} label="10人に1人の悪さ" />
                  <FormControlLabel value="0.25" control={<Radio />} label="4人に1人の悪さ" />
                  <FormControlLabel value="0.5" control={<Radio />} label="普通" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <p className="result">{result}</p>

      <p>
        {startAge}歳の{genderString}の{((1 - alive) * 100).toFixed(2)}%が{age}歳までに死にます。
      </p>

      <Share result={result} />

      <p>
        参考データ：<a href="https://www.mhlw.go.jp/toukei/saikin/hw/life/life18/index.html" style={{ color: "white" }}>厚生労働省 平成30年簡易生命表</a>
      </p>
    </div>
  );
}

const Form = () => {

  return <></>
}
export default App;
