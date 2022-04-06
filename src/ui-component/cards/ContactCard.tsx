import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, Grid, Menu, MenuItem, Typography, Theme } from '@material-ui/core';

// project imports
import Avatar from '../extended/Avatar';
import { gridSpacing } from 'store/constant';
import { UserProfile } from '_mockApis/user-profile/types';

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import PhoneTwoToneIcon from '@material-ui/icons/PhoneTwoTone';

const avatarImage = require.context('assets/images/users', true);

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    followerBlock: {
        padding: '16px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
        borderColor: theme.palette.grey[100]
    },
    primaryLight: {
        color: theme.palette.grey[500],
        cursor: 'pointer'
    },
    profileAvatar: {
        width: '72px',
        height: '72px'
    }
}));

// ==============================|| USER CONTACT CARD ||============================== //

export interface ContactCardProps extends UserProfile {
    onActive: () => void;
}

const ContactCard = ({ avatar, contact, email, name, location, onActive, role }: ContactCardProps) => {
    const classes = useStyles();

    const avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    const [anchorEl, setAnchorEl] = React.useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent<SVGSVGElement> | undefined) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.followerBlock}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid
                            item
                            xs
                            zeroMinWidth
                            onClick={() => {
                                onActive && onActive();
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <Avatar alt={name} size="large" src={avatarProfile} className={classes.profileAvatar} />
                        </Grid>
                        <Grid item>
                            <MoreHorizOutlinedIcon
                                fontSize="small"
                                className={classes.primaryLight}
                                aria-controls="menu-user-details-card"
                                aria-haspopup="true"
                                onClick={handleClick}
                            />
                            <Menu
                                id="menu-user-details-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}> Today</MenuItem>
                                <MenuItem onClick={handleClose}> This Month</MenuItem>
                                <MenuItem onClick={handleClose}> This Year </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                        {name}
                    </Typography>
                    <Typography variant="caption">{role}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="h6">{email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="h6">{contact}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Location</Typography>
                            <Typography variant="h6">{location}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button variant="outlined" sx={{ width: '100%' }} startIcon={<ChatBubbleTwoToneIcon />}>
                                Message
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="secondary" sx={{ width: '100%' }} startIcon={<PhoneTwoToneIcon />}>
                                Call
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ContactCard;
