<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>



    <div class="ava-page ava-page--login">

        <div class="login-block">
            <img src="/images/logo.svg" alt="logo">
            <p class="text-center mt-28 mb-38">Enter the login and password provided to you to begin communicating with the AI assistant</p>

            <form class="form form--login" @submit.prevent="submit">

                <div class="form-group mb-16">
                    <TextInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        required
                        autofocus
                        autocomplete="username"
                    />

                </div>

                <div class="form-group">
                    <TextInput
                        id="password"
                        v-model="form.password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        required
                        autocomplete="current-password"
                    />
                    <InputError class="mt-2" :message="form.errors.password" />



                </div>

                <div class="form-group form-group--checkbox mt-26 mx-auto">
                    <label for="agreement">
                        <input class="form-control" type="checkbox" value="Y" name="agreement" id="agreement" required>
                        <span class="form-control-checkbox"></span>
                        <span>I consent to the personal data provided in this form</span>
                    </label>
                </div>

                <p class="form-message mt-26" :style="form.errors.email ? 'display: block' : ''"><InputError class="mt-2" :message="form.errors.email" /></p>

                <PrimaryButton class="btn-ava mt-48 mx-auto" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Start communicate with Ava
                </PrimaryButton>



            </form>

        </div>

    </div>


    
</template>
