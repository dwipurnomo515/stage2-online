import { useDispatch, useSelector } from 'react-redux';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export var useAppDispatch = useDispatch.withTypes();
export var useAppSelector = useSelector.withTypes();
