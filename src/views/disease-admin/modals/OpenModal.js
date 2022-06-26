import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';

export default function NestedModal(text) {
    const { value } = text;
    let modal = null;

    if (value === 'Criar') {
        modal = CreateModal();
    } else {
        modal = DeleteModal();
    }

    return modal;
}
