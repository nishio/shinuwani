import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import './App.css';
import { InputLabel, MenuItem, Select, Grid } from '@material-ui/core';


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
  const classes = useStyles();
  const [gender, setGender] = React.useState('male');
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


      <p className="result">あなたは{age}歳で死にます。</p>
      {startAge}歳の{genderString}の
  {((1 - alive) * 100).toFixed(2)}%が{age}歳までに死にます。
    </div >
  );
}

export default App;

const MALE = [
  0.00196,
  0.00025,
  0.00019,
  0.00014,
  0.00011,
  0.00010,
  0.00008,
  0.00007,
  0.00007,
  0.00007,
  0.00007,
  0.00008,
  0.00009,
  0.00011,
  0.00014,
  0.00016,
  0.00020,
  0.00024,
  0.00029,
  0.00035,
  0.00040,
  0.00044,
  0.00047,
  0.00049,
  0.00049,
  0.00049,
  0.00049,
  0.00050,
  0.00051,
  0.00053,
  0.00055,
  0.00057,
  0.00060,
  0.00063,
  0.00065,
  0.00068,
  0.00072,
  0.00076,
  0.00081,
  0.00087,
  0.00094,
  0.00102,
  0.00112,
  0.00123,
  0.00136,
  0.00149,
  0.00164,
  0.00181,
  0.00200,
  0.00221,
  0.00245,
  0.00274,
  0.00305,
  0.00336,
  0.00368,
  0.00401,
  0.00437,
  0.00481,
  0.00532,
  0.00589,
  0.00651,
  0.00717,
  0.00788,
  0.00864,
  0.00948,
  0.01047,
  0.01159,
  0.01283,
  0.01419,
  0.01555,
  0.01695,
  0.01854,
  0.02036,
  0.02240,
  0.02465,
  0.02709,
  0.02964,
  0.03261,
  0.03621,
  0.04053,
  0.04565,
  0.05149,
  0.05812,
  0.06555,
  0.07417,
  0.08412,
  0.09532,
  0.10774,
  0.12093,
  0.13456,
  0.14830,
  0.16406,
  0.18130,
  0.20011,
  0.22060,
  0.24284,
  0.26691,
  0.29287,
  0.32075,
  0.35056,
  0.38229,
  0.41587,
  0.45119,
  0.48808,
  0.52633,
  1.0
]
const FEMALE = [
  0.00181,
  0.00027,
  0.00019,
  0.00012,
  0.00009,
  0.00007,
  0.00006,
  0.00006,
  0.00006,
  0.00005,
  0.00006,
  0.00007,
  0.00007,
  0.00008,
  0.00010,
  0.00011,
  0.00012,
  0.00014,
  0.00016,
  0.00018,
  0.00021,
  0.00021,
  0.00021,
  0.00020,
  0.00020,
  0.00021,
  0.00022,
  0.00024,
  0.00025,
  0.00027,
  0.00028,
  0.00030,
  0.00031,
  0.00033,
  0.00035,
  0.00038,
  0.00040,
  0.00044,
  0.00048,
  0.00053,
  0.00058,
  0.00063,
  0.00068,
  0.00074,
  0.00082,
  0.00092,
  0.00101,
  0.00113,
  0.00125,
  0.00135,
  0.00145,
  0.00156,
  0.00169,
  0.00182,
  0.00196,
  0.00209,
  0.00223,
  0.00239,
  0.00257,
  0.00276,
  0.00297,
  0.00321,
  0.00345,
  0.00370,
  0.00399,
  0.00434,
  0.00477,
  0.00529,
  0.00589,
  0.00651,
  0.00711,
  0.00772,
  0.00841,
  0.00929,
  0.01042,
  0.01175,
  0.01320,
  0.01491,
  0.01702,
  0.01953,
  0.02244,
  0.02574,
  0.02960,
  0.03420,
  0.03975,
  0.04618,
  0.05354,
  0.06179,
  0.07110,
  0.08163,
  0.09348,
  0.10682,
  0.12138,
  0.13784,
  0.15979,
  0.18088,
  0.20320,
  0.22676,
  0.25157,
  0.27762,
  0.30491,
  0.33338,
  0.36300,
  0.39369,
  0.42537,
  1.0
]