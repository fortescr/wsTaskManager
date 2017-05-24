package com.taskManager.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.taskManager.util.JpaUtil;


public class GenericDAO<T> {

	protected EntityManager em = JpaUtil.getEntityManager();

	public List<T> getAll(String classe, String where){
		Query q = em.createQuery("select x from " +classe+" x where 1=1 "+where);
		q.setFirstResult(0);
		q.setMaxResults(10);

		return q.getResultList();
	}

	public T getEntity(String classe, Integer id){
		return (T) em.createQuery("select x from " +classe+" x  where x.id = "+id).getSingleResult();
	}

	public void save(T entity){
		em.getTransaction().begin();
		try{
			em.persist(entity);
			em.getTransaction().commit();
		}catch(Exception e){
			em.getTransaction().rollback();
			e.printStackTrace();
		}
	}

	public void edit(T entity){
		em.getTransaction().begin();
		try{
			em.merge(entity);
			em.getTransaction().commit();
		}catch(Exception e){
			em.getTransaction().rollback();
			e.printStackTrace();
		}
	}

	public void remove(String classe, Integer id){
		em.getTransaction().begin();
		try{
			Object entity = em.createQuery("select x from " +classe+" x  where x.id = "+id).getSingleResult();
			em.remove(entity);
			em.getTransaction().commit();
		}catch(Exception e){
			em.getTransaction().rollback();
			e.printStackTrace();
		}
	}
}
