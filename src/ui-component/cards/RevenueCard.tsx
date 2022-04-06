// material-ui
import { makeStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { GenericCardProps } from 'types';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    revenueCard: {
        position: 'relative',
        color: '#fff'
    },
    revenueIcon: {
        position: 'absolute',
        right: '13px',
        top: '14px',
        color: '#fff',
        '&> svg': {
            width: '100px',
            height: '100px',
            opacity: '0.5'
        },
        [theme.breakpoints.down('xs')]: {
            top: '13px',
            '&> svg': {
                width: '80px',
                height: '80px'
            }
        }
    }
}));

// =============================|| REVENUE CARD ||============================= //

export interface RevenueCardProps extends GenericCardProps {}

const RevenueCard = ({ primary, secondary, content, iconPrimary, color }: RevenueCardProps) => {
    const classes = useStyles();

    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    const IconPrimary = iconPrimary!;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card style={{ background: color }} className={classes.revenueCard}>
            <CardContent>
                <Typography variant="body2" className={classes.revenueIcon}>
                    {primaryIcon}
                </Typography>
                <Grid container direction={matchDownXs ? 'column' : 'row'} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="inherit">
                            {content}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RevenueCard;
