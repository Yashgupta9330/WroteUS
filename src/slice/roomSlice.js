import { createSlice } from '@reduxjs/toolkit';
import { socket } from '@/socket';



const initialState ={
  roomno: socket.id,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
      roomClick: (state, action) => {
      console.log("initial value", state.roomno)
      state.roomno=action.payload;
      console.log("final value:",state.roomno);
    },
  },
});

export const { roomClick } = roomSlice.actions;
export default roomSlice.reducer;


