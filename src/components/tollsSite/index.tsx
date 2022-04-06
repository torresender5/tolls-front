import React from 'react'
import { useSelector } from 'react-redux'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    CardContent,
    Grid,
    Tab,
    Tabs,
    Theme,
    Typography,
} from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import { gridSpacing } from 'store/constant'
// import TollForm from './tolls/TollForm'

// assets
import TarjetaIcon from '../icons/TarjetaIcon.png'
import { DefaultRootStateProps } from 'types'
import LineForm from './lineForm'
// import EmployeesForm from './employees/employeesForm'
import EquipmentForm from './equipmentForm'
import TariffForm from './tariffForm'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    profileTab: {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none',
        },
        '& button': {
            color:
                theme.palette.mode === 'dark'
                    ? theme.palette.grey[600]
                    : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[50],
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
            marginTop: '10px',
            height: '20px',
            width: '20px',
        },
        '& button > div > span': {
            display: 'block',
        },
        '& > div > span': {
            display: 'none',
        },
    },
    cardPanels: {
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.mode === 'dark' ? '#333d5e' : '#eeeeee',
        height: '100%',
    },
}))

// tabs
function TabPanel(props: {
    children: React.ReactElement
    value: number
    index: number
}) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

// tabs option
const tabsOption = [
    {
        label: 'Datos del peaje',
        icon: (
            <img
                src={TarjetaIcon}
                alt="tarjeta"
                style={{ width: '30px', marginRight: '5px' }}
            />
        ),
        caption: 'Datos del punto de recoleccion',
    },
    {
        label: 'Canales',
        icon: (
            <img
                src={TarjetaIcon}
                alt="tarjeta"
                style={{ width: '30px', marginRight: '5px' }}
            />
        ),
        caption: 'Descripcion de cada canal'
    },
    {
        label: 'Empleados',
        icon:(
            <img
                src={TarjetaIcon}
                alt="tarjeta"
                style={{ width: '30px', marginRight: '5px' }}
            />
        ),
        caption: 'Descripcion de el personal que labora en el sitio'
    },
    {
        label: 'Equipos',
        icon:(
            <img
                src={TarjetaIcon}
                alt="tarjeta"
                style={{ width: '30px', marginRight: '5px' }}
            />
        ),
        caption: 'Descripcion de equipos que esten en la estacion'
    },
    {
        label: 'Tarifas aplicadas',
        icon:(
            <img
                src={TarjetaIcon}
                alt="tarjeta"
                style={{ width: '30px', marginRight: '5px' }}
            />
        ),
        caption: 'Datos de las tarifas permitidas en el peaje'
    },
    // {
    //     label: 'Representante legal',
    //     icon:<VpnKeyTwoToneIcon /> ,
    //     caption: 'datos del representante legal'
    // },
    // {
    //     label: 'Datos bancarios',
    //     icon: <CreditCardTwoToneIcon />,
    //     caption: 'datos bancarios de la empresa'
    // }
]

// ==============================|| PROFILE 2 ||============================== //

interface CompanyProfileProps {
    cardsIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
}
const TollsProfile = ({
    cardsIdParam,
    readOnly,
}: CompanyProfileProps) => {
    const classes = useStyles()
    const customization = useSelector(
        (state: DefaultRootStateProps) => state.customization
    )
    const [value, setValue] = React.useState<number>(0)

    const handleChange = (event: React.SyntheticEvent, newValue) => {
        console.log(event.target)
        setValue(newValue)
    }
    console.log("cardsIdParam ",cardsIdParam)

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard sx={{ padding: '15px' }} content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={4}>
                            <CardContent>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation="vertical"
                                    className={classes.profileTab}
                                    variant="scrollable"
                                    sx={{
                                        '& button': {
                                            borderRadius: `${customization.borderRadius}px`,
                                        },
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            icon={tab.icon}
                                            label={
                                                <Grid
                                                    container
                                                    direction="column"
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="inherit"
                                                    >
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography
                                                        component="div"
                                                        variant="caption"
                                                        sx={{
                                                            textTransform:
                                                                'none',
                                                        }}
                                                    >
                                                        {tab.caption}
                                                    </Typography>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                           
                            <CardContent className={classes.cardPanels}>
                                {/* <TabPanel value={value} index={0}> */}
                                    {/* <TollForm
                                        tollIdParam={cardsIdParam}
                                        readOnly={readOnly}
                                    /> */}
                                {/* </TabPanel> */}
                                <TabPanel value={value} index={1}>
                                    <LineForm />
                                </TabPanel>
                                {/* <TabPanel value={value} index={2}>
                                    {/* <EmployeesForm /> 
                                </TabPanel> */}
                                <TabPanel value={value} index={3}>
                                    <EquipmentForm />
                                </TabPanel>
                                <TabPanel value={value} index={4}>
                                    <TariffForm />
                                </TabPanel>
                            </CardContent>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    )
}

export default TollsProfile
